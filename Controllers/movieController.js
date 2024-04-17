
const reviews = require('../Models/reviewSchema')
// const { find } = require('../Models/userSchema');



// exports.addreview = async(req,res)=>{
//     console.log("inside add project controll");
//     console.log("getting user id in controller");
//  const userId=req.payload;
//  console.log(userId)
//  const MovieImage = req.file.filename;
//  console.log(MovieImage);
//  const {moviename, director, Starring, reviewer, overview } = req.body;
  
//  try {
   
//     const lowerCaseMovieName = moviename.toLowerCase();

//     const existingReview = await reviews.findOne({ moviename: { $regex: new RegExp(`^${lowerCaseMovieName}$`, 'i') } });


    
//     // const existingReview = await reviews.findOne({ moviename: moviename});

//     if (existingReview) {
//         res.status(406).json("Review already exists, upload a new review");
//     }
//     else {
//         const newreview = new reviews({
//             moviename:  moviename,
//             director:  director,
//             Starring: Starring,
//             reviewer:  reviewer,
//             overview: overview,
//             userId: userId,
//             MovieImage: MovieImage
//         })
//         await newreview.save();//saved to db
//         res.status(200).json(newreview)
//     }

// } catch (err) {
//     res.status(401).json("Add review request failed due to error", err)
// }
// }


exports.addreview = async (req, res) => {
    console.log("inside add project controller");
    console.log("getting user id in controller");
    const userId = req.payload;
    console.log(userId);
    const MovieImage = req.file.filename;
    console.log(MovieImage);
    const { moviename, director, Starring, reviewer, overview } = req.body;

    try {

        const lowerCaseMovieName = moviename.toLowerCase();

        const existingReview = await reviews.findOne({ moviename: { $regex: new RegExp(`^${lowerCaseMovieName}$`, 'i') }, userId: userId });

        if (existingReview) {
            res.status(406).json("You have already added a review for this movie");
        }
        else {
            const newreview = new reviews({
                moviename: moviename,
                director: director,
                Starring: Starring,
                reviewer: reviewer,
                overview: overview,
                userId: userId,
                MovieImage: MovieImage
            })
            await newreview.save(); //saved to db
            res.status(200).json(newreview);
        }

    } catch (err) {
        res.status(401).json("Add review request failed due to error", err);
    }
}



exports.dashpage = async (req, res) => {
    try {
        const latestReviews = await reviews.find().sort({ _id: -1 }).limit(6);
        res.status(200).json(latestReviews);
    } catch (err) {
        res.status(401).json("Request failed due to error:", err);
    }
}

exports.getAllreviews = async (req, res) => {
    try {
        const searchkey = req.query.search;
        console.log("searchkey", searchkey);

        const query = {
            moviename: {
                $regex: new RegExp(searchkey, "i")
            }
        };

        const allreviews = await reviews.find(query).sort({ _id: -1 });
        res.status(200).json(allreviews);
    } catch (err) {
        res.status(401).json("Request failed due to error:", err);
    }
}





// exports.getAllreviews = async (req, res) => {
//     try {

//         //getting value send as qury parameter:req.query.key_name

//         const searchkey=req.query.search;
//         console.log("searchkey",searchkey)


//         const query = {
//             // Creating a regular expression to perform case-insensitive search
//             moviename: {
//                 $regex: new RegExp(searchkey, "i")
//             }
//         };


//         const allreviews = await reviews.find(query)
//         res.status(200).json(allreviews);
//     }
//     catch (err) {
//         res.status(401).json("Request failed due to error:", err)
//     }
// }

exports.getUserreview = async (req, res) => {
    const userId = req.payload;

    try {
        const allUserreview = await reviews.find({ userId: userId }).sort({ _id: -1 });
        res.status(200).json(allUserreview)
    }
    catch (err) {
        res.status(401).json("Request failed due to error:", err)
    }
}

exports.editUserreview = async (req, res) => {
    console.log("==inside edit project")
    const { id } = req.params;
    const userId = req.payload;
    const{moviename,director,Starring,reviewer,overview,MovieImage}= req.body;
    const uploadReviewImage = req.file ? req.file.filename : MovieImage;
  
    try {
        const updateReview = await reviews.findByIdAndUpdate({ _id: id }, {
            moviename:  moviename,
            director:  director,
            Starring: Starring,
            reviewer:  reviewer,
            overview: overview,
            userId: userId,
            MovieImage: uploadReviewImage,
          
        },
        {
            new: true
        })
    
        await updateReview.save()
        res.status(200).json("Review updated successfully")
   
    
    }

    catch (err) {
        res.status(401).json("Unable to update project due to", err)
    }

}

exports.deleteUserreview = async (req, res) => {
    const { id } = req.params;
    try {
        const removeReview = await reviews.findByIdAndDelete({_id:id});
        res.status(200).json("project deleted successfully")
    } catch (err) {
        res.status(401).json("Delete project failed", err)
    }
}





