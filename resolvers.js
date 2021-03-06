const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

exports.resolvers = {
  Query: {
    getAllRecipes: async (root, args, { Recipe }) => {
      const allRecipes = await Recipe.find().sort({
        createdDate: 'desc'
      });
      return allRecipes;
    },

    getUserRecipes: async (root, { username }, { Recipe }) => {
      const userRecipes = await Recipe.find({ username }).sort({
        createdDate: 'desc'
      });
      console.log('USER RECIPES', userRecipes);
      return userRecipes;
    },

    getCurrentUser: async (root, args, { currentUser, User }) => {
      if (!currentUser) {
        return null;
      }

      const user = await User.findOne({ username: currentUser.username }).populate({
        path: 'favorites',
        model: 'Recipe'
      });

      return user;
    },

    getRecipe: async (root, { id }, { Recipe }) => {
      const recipe = await Recipe.findOne({ _id: id });
      return recipe;
    },

    searchRecipes: async (root, { searchTerm }, { Recipe }) => {
      if (searchTerm) {
        // do search
        const searchResults = await Recipe.find(
          {
            $text: { $search: searchTerm }
          },
          {
            score: { $meta: 'textScore' }
          }
        ).sort({
          score: { $meta: 'textScore' }
        });
        return searchResults;
      } else {
        const recipes = await Recipe.find().sort({ likes: 'desc', createdDate: 'desc' });
        return recipes;
      }
    }
  },

  Mutation: {
    //parent, args, context
    addRecipe: async (root, { name, description, category, instructions, username }, { Recipe }) => {
      const newRecipe = await new Recipe({
        name,
        description,
        category,
        instructions,
        username
      }).save();
      return newRecipe;
    },
    deleteUserRecipe: async (root, { id }, { Recipe }) => {
      const recipe = await Recipe.findOneAndDelete({ _id: id });
      return recipe;
    },

    signInUser: async (root, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Invalid Password');
      }
      return {
        token: createToken(user, process.env.SECRET, '1hr')
      };
    },

    signUpUser: async (root, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error('User already exists');
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();

      return {
        token: createToken(newUser, process.env.SECRET, '1hr')
      };
    },

    likeRecipe: async (root, { id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ id }, { $inc: { likes: 1 } });
      const user = await User.findOneAndUpdate({ username }, { $addToSet: { favorites: id } });

      return recipe;
    },

    unlikeRecipe: async (root, { id, username }, { Recipe, User }) => {
      const recipe = await Recipe.findOneAndUpdate({ id }, { $inc: { likes: -1 } });
      const user = await User.findOneAndUpdate({ username }, { $pull: { favorites: id } });

      return recipe;
    }
  }
};
