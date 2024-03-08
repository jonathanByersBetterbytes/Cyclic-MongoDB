const cloudinary = require("../middleware/cloudinary");
const pdf2excel = require("pdf-to-excel");
const XLSX = require('xlsx')
let fs = require('fs'), PDFParser = require("pdf2json");
let pdfParser = new PDFParser(this, 1);
const session = require('express-session')
const mongoose = require("mongoose");

//let test2 = require('jest')
const sum = require("../tests/sum");

const Post = require("../models/Post");

module.exports = {
  getTesting: async (req, res) => { 
    console.log('testing')
    // test2('adds 1 + 2 to equal 3', () => {
    //   expect(sum(1, 2)).toBe(3)
    // })
    //console.log()
    try {
      //const posts = await Post.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      res.render("testing.ejs", { posts: 'testing' }); 
    } catch (err) {
      console.log(err);
    }
  },
  // getProfile: async (req, res) => { 
  //   console.log(req.user)
  //   try {
  //     //Since we have a session each request (req) contains the logged-in users info: req.user
  //     //console.log(req.user) to see everything
  //     //Grabbing just the posts of the logged-in user
  //     const posts = await Post.find({ user: req.user.id });
  //     //Sending post data from mongodb and user data to ejs template
  //     res.render("profile.ejs", { posts: posts, user: req.user }); 
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getPost: async (req, res) => {
  //   try {
  //     //id parameter comes from the post routes
  //     //router.get("/:id", ensureAuth, postsController.getPost);
  //     //http://localhost:3000/post/631a7f59a3e56acfc7da286f
  //     //id === 631a7f59a3e56acfc7da286f
  //     const post = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getTesting: async (req, res) => {
    
  // },
  // parsePDFs: async (req, res) => {
  //   let cnt = 0, excelJSON = [] 
  //   const loadPDF = (stmnt) => { // this will be a recursive function
  //     if(req.files.length === cnt){
  //       console.log('Done');
  //       return new Promise(() => { 
  //         req.session.parsedTextOutput = excelJSON;
  //         res.redirect("/dataaggregator");
  //       })
  //     }
  //     pdfParser = new PDFParser(this, 2); // needs to initialize to clear cashe
  //     pdfParser.loadPDF(stmnt.path)

  //     pdfParser.on("pdfParser_dataError", (errData) =>
  //       console.error(errData.parserError)
  //     ); 

  //     pdfParser.on("pdfParser_dataReady", (pdfData) => {
  //       console.log('NEW FILE received pdf: ' + stmnt.originalname)
  //       let activity = ''
  //       try{ 
  //         let parsedText = JSON.stringify(pdfData)  
  //         for(let i=0;i<20 && parsedText.indexOf('"T":"balance"') != -1;i++){
  //           parsedText = parsedText.substring(parsedText.indexOf('"T":"balance"')+4) // chop header
  //           parsedText = parsedText.substring(parsedText.indexOf('}]}')+4) // chop header
  //           activity += parsedText.substring(0, parsedText.indexOf('],"Fields":[]'))+',' // add page and add ',' to connect the JSON pages
  //         }
  //         activity = activity.substring(0, activity.indexOf('Ending%20balance')) // chop footer
  //         activity = activity.substring(0, activity.lastIndexOf(',{"x":')) // chop footer
  //         activity = activity.replaceAll(',"S":-1,"TS":[0,10.2,0,0]', '') // remove useless data
  //         activity = activity.replaceAll('"clr":0,"sw":0.32553125,"A":"left",', '') // remove useless data  
  
  //         activity = JSON.parse('['+activity+']')
  //         console.log('generated json ' + stmnt.originalname)
  //       }catch (err) {
  //         console.log(err) 
  //       }
    
  //       let actLine // needs to be outside loop to build line
  //       activity.forEach(col => { 
  //         if(col.x === 3.8){ // if date then also start new line
  //           // replace special characters
  //           if(actLine) actLine.Description = actLine.Description.replaceAll('%24', '$').replaceAll('%26', '&').replaceAll('%20', ' ').replaceAll('%23', '#').replaceAll('%2F', '/').replaceAll('%2C', ',')
  //           actLine = {'Description':''} // initialize new line if it's the date
  //           excelJSON.push(actLine)  
  //           // year needs to be dynamicaly scraped from name: '2021.01.31.pdf'
  //           actLine['Date'] = col.R[0]['T'].replaceAll('%2F', '/')+'/'+stmnt.originalname.substring(0,4)
  //         }else if(col.x > 7.5 && col.x < 8) actLine['Check#'] = col.R[0].T 
  //         else if(col.x === 9.275) actLine['Description'] += col.R[0]['T']  // build description
  //         else if(col.x > 24 && col.x < 27) actLine['Amount'] = +col.R[0]['T'].replaceAll('%2C', '') // deposit
  //         else if(col.x > 28 && col.x < 31) actLine['Amount'] = -col.R[0]['T'].replaceAll('%2C', '') // withdrawal
  //         //actLine['x'] = col.x 
  //         //console.log('Description: '+actLine['Description'])
  //       }) 
  //       //console.log(JSON.stringify(excelJSON)) 

  //       console.log('END Parse ' + stmnt.originalname)  
  //       loadPDF(req.files[++cnt]) // recursion to process next file        
  //     });  
  //   }
  //   console.log('Starting ')
  //   loadPDF(req.files[cnt]) // recursion 
  // }, 

  // getPost: async (req, res) => {
  //   try {
  //     //id parameter comes from the post routes
  //     //router.get("/:id", ensureAuth, postsController.getPost);
  //     //http://localhost:3000/post/631a7f59a3e56acfc7da286f
  //     //id === 631a7f59a3e56acfc7da286f
  //     const post = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // getFeed: async (req, res) => {
  //   try {
  //     //get all posts in desc order by createdAt
  //     const posts = await Post.find().sort({ createdAt: "desc" }).lean()
  //     res.render("feed.ejs", { posts: posts });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // createPost: async (req, res) => {
  //   try {
  //     // Upload image to cloudinary
  //     const result = await cloudinary.uploader.upload(req.file.path);

  //     //media is stored on cloudainary - the above request responds with url to media and the media id that you will need when deleting content 
  //     await Post.create({
  //       title: req.body.title,
  //       image: result.secure_url,
  //       cloudinaryId: result.public_id,
  //       caption: req.body.caption,
  //       likes: 0,
  //       user: req.user.id,
  //     });
  //     console.log("Post has been added!");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // completedPost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         completedName: req.user.userName
  //       }
  //     );
  //     console.log("Post marked complete by "+req.user.name);
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // likePost: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // deletePost: async (req, res) => {
  //   try {
  //     // Find post by id
  //     let post = await Post.findById({ _id: req.params.id });
  //     // Delete image from cloudinary
  //     await cloudinary.uploader.destroy(post.cloudinaryId);
  //     // Delete post from db
  //     await Post.remove({ _id: req.params.id });
  //     console.log("Deleted Post");
  //     res.redirect("/profile");
  //   } catch (err) {
  //     res.redirect("/profile");
  //   }
  // },
};
