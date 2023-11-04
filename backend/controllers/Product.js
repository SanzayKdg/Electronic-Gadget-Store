import { Product } from "../models/Product.js";
import ApiFeatures from "../utils/ApiFeatures.js";
import cloudinary from "cloudinary";
import { User } from "../models/User.js";
import { Order } from "../models/Order.js";

// Create Product -- Admin
export const createProduct = async (req, res, next) => {
  try {
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imageLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imageLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imageLinks;
    req.body.user = req.body.id;

    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      errMessage: "Unauthorized. Only admin can add products",
    });
  }
};

// get all products -- admin
export const getProductsAdmin = async (req, res, next) => {
  try {
    const resultPerPage = 10;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apiFeature.query;

    if (!products) {
      return next(
        res.status(404).json({ success: false, message: "Products Not Found" })
      );
    }
    res.status(200).json({
      products,
      productCount,
      resultPerPage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get product details
export const getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(
        res.status(404).json({ success: false, message: "Product Not Found" })
      );
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update products -- admin
export const updateProducts = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(
        res.status(404).json({ success: false, message: "Product Not Found" })
      );
    }

    // Get images after fetching products
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      // Deleteing old imgaes from cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLink = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });

        imagesLink.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      req.body.images = imagesLink;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      product,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Deleting Products
export const deleteProducts = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return next(
        res.status(404).json({ success: false, message: "Product Not Found" })
      );
    }

    // Deleting images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // await product.remove();

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Create a new Review
export const newReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      image: req.user.avatar.url,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    const product = await Product.findById(productId);
    const isReviewd = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    // If already reviewed update it else post new review
    if (isReviewd) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }
    // Calculate the average review of the product
    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    // save in user_preference if rated
    await User.findByIdAndUpdate(
      review.user,
      {
        // $addToSet doesnot let duplicate entries to occur
        $addToSet: { my_preference: product },
      },
      {
        new: true,
        runValidators: true,
        validateBeforeSave: false,
      }
    ).exec();

    res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all reviews -- admin
export const getAllreviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      return next(
        res.status(404).json({ success: false, message: "Product Not Found" })
      );
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get all products -- user

export const getAllProducts = async (req, res) => {
  try {
    const apiFeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    const products = await apiFeatures.query;
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete reviews
export const deleteProductReviews = async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: "Product Not Found" });
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
};

// Recommend Products with Algorithm

// item-based coolaborative filtering of product using cosine similarity
function cosineSimilarity(vec1, vec2) {
  // calculate dot product
  const dot_product = vec1.reduce(
    (acc, rating, index) => acc + rating * vec2[index],
    0
  );

  // calculate magnitude of the vectors
  const magnitude1 = Math.sqrt(
    vec1.reduce((acc, rating) => acc + rating ** 2, 0)
  );
  const magnitude2 = Math.sqrt(
    vec2.reduce((acc, rating) => acc + rating ** 2, 0)
  );

  // calculate cosine similarity
  return dot_product / (magnitude1 * magnitude2);
}

export const recommendProduct = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("my_preference");

  const user_ratings = user.my_preference.map((product) => product.ratings);
  const product_category = await Product.find({
    category: { $in: user.my_preference.map((product) => product.category) },
  });

  // calculate similarity for each product in the category
  const recommendations = product_category.map((product) => {
    const product_ratings = user.my_preference.map(
      (preference) => preference.ratings || 0
    );
    const similarity = cosineSimilarity(user_ratings, product_ratings);
    return { product, similarity };
  });

  // calculate weighted sum of ratings based on similarities
  const total_similarity = recommendations.reduce(
    (acc, item) => acc + item.similarity,
    0
  );

  const predicted_ratings = recommendations.map((item) => {
    const weighted_sum = item.product.ratings * item.similarity;
    const predicted_rating =
      total_similarity !== 0 ? weighted_sum / total_similarity : 0;
    return { ...item.product.toObject(), predicted_rating };
  });

  // sort recommended products by ratings
  predicted_ratings.sort((a, b) => b.predicted_rating - a.predicted_rating);

  // return recommended products without the user's existing preferences
  const recommended_prodcuts = predicted_ratings
    .filter((item) => !user.my_preference.map((p) => p._id).includes(item._id))
    // Set ratings to predicted ratings
    .map((item) => ({ ...item, ratings: item.predicted_rating }));

  res.status(200).json({ recommend: recommended_prodcuts });
};
 


// item-based coolaborative filtering of product using jaccard similarity
// export const showRecommendations = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id).populate("my_preference");

//     if (!user) {
//       return next(res.status(404).json({ message: "User not found" }));
//     }

//     const recommendation = {};

//     // Iterate through the user's preferences
//     for (const preferred_product of user.my_preference) {
//       // Find products in the same category as the preferred product
//       const similar_products = await Product.find({
//         category: preferred_product.category,
//         _id: { $ne: preferred_product.id },
//       });

//       // Calculate the weighted rating for each similar product
//       for (const product of similar_products) {
//         if (!recommendation[product._id]) {
//           recommendation[product._id] = {
//             product,
//             similarity_sum: 0,
//             rating_sum: 0,
//           };
//         }

//         const similarity = calculateSimilarity(
//           preferred_product.category,
//           product.category
//         );

//         // Calculate weighted rating
//         const weightedRating = userRating(user, product) * similarity;

//         recommendation[product._id].similarity_sum += similarity;
//         recommendation[product._id].rating_sum += weightedRating;
//       }
//     }

//     // Filter out products the user has already rated
//     const alreadry_rated_products = user.my_preference.map(
//       (product) => product._id
//     );

//     for (const product_id of alreadry_rated_products) {
//       delete recommendation[product_id];
//     }

//     // Normalize and sort the recommendations
//     const recommend_prodcuts = Object.values(recommendation)
//       .map((item) => {
//         item.product.weightedRating = item.similarity_sum;
//         return item.product;
//       })
//       .sort((a, b) => b.weightedRating - a.weightedRating);

//     res.status(200).json({ recommend: recommend_prodcuts });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // calculate category similarity
// function calculateSimilarity(category1, category2) {
//   const set1 = new Set(category1.toLowerCase().split(" "));
//   const set2 = new Set(category2.toLowerCase().split(" "));

//   // Calculate the intersection and union of the two sets
//   const intersectionSize = new Set([...set1].filter((x) => set2.has(x))).size;
//   const unionSize = set1.size + set2.size - intersectionSize;

//   // Calculate the Jaccard similarity coefficient
//   const similarity = intersectionSize / unionSize;

//   return similarity;
// }

// // calculate user rating for a product
// function userRating(user, product) {
//   let rating_sum = 0;
//   let similarity_sum = 0;

//   for (const preferred_product of user.my_preference) {
//     // Calculate the Jaccard similarity between the user's preferred category and the product's category
//     const category_similarity = calculateSimilarity(
//       preferred_product.category,
//       product.category
//     );

//     // If the user has rated the preferred product and the categories are similar
//     if (preferred_product.rating && category_similarity > 0) {
//       rating_sum += preferred_product.rating * category_similarity;
//       similarity_sum += category_similarity;
//     }
//   }

//   // To avoid division by zero
//   if (similarity_sum === 0) {
//     return 0;
//   }

//   return rating_sum / similarity_sum;
// }
