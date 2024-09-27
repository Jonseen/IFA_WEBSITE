const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Doc = require('../models/Doc');


// Routes

// GET
// HOME
router.get('', async (req, res) => {
    const locals = {
        title: 'Homepage',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'home', 'brand']
    }

    try {
        const data = await Post.find();
        res.render('index', { locals, data });      
    } catch (error) {
        console.log(error);
    }
})



// const insertPostData = () => {
//     Post.insertMany([
//         {
//             title: 'Welcome to the Inclusive Friends Association',
//             body: 'This is an exclusive community for friends who want to support each other and create a supportive environment for everyone.'
//         },
//         {
//             title: 'Welcome to the Inclusive Friends Association',
//             body: 'This is an exclusive community for friends who want to support each other and create a supportive environment for everyone.'
//         },
//         {
//             title: 'Welcome to the Inclusive Friends Association',
//             body: 'This is an exclusive community for friends who want to support each other and create a supportive environment for everyone.'
//         },
//         {
//             title: 'Welcome to the Inclusive Friends Association',
//             body: 'This is an exclusive community for friends who want to support each other and create a supportive environment for everyone.'
//         },
//         {
//             title: 'Welcome to the Inclusive Friends Association',
//             body: 'This is an exclusive community for friends who want to support each other and create a supportive environment for everyone.'
//         },
//     ])
// }

// insertPostData();

router.get('/newsUpdates', async (req, res) => {
    try {

        const locals = {
            title: 'News & Updates',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }

        let perPage = 5;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // const data = await Post.find();
        res.render('newsUpdates', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }
})


// GET
// POST:ID
router.get('/newsDetail/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({_id: slug});

        const locals = {
            title: data.title,
            description: data.body,
            keywords: ['website', 'post', 'brand']
        }

        res.render('newsDetail', { locals, data })
    } catch (error) {
        console.log(error);
    }
})


// POST
// SEARCH TERM

router.post('/newsUpdates', async (req, res) => { 
    try {
        const locals = {
            title: "Search",
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'post', 'brand']
        }

        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, '');

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSpecialChar, 'i'),}},
                { body: {$regex: new RegExp(searchNoSpecialChar, 'i'),}}
            ]
        });

        let perPage = 5;
        let page = req.query.page || 1;

        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        // res.send(searchTerm);
        res.render('search', { 
            locals,
            data,
            current: page,
            nextPage: hasNextPage? nextPage : null  // Check if next page exists
        })
    } catch (error) {
        console.log(error)
    }
})


router.get('/about', (req, res) => {

    const locals = {
        title: 'About us',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('about', { locals });
})


router.get('/whoweare', (req, res) => {

    const locals = {
        title: 'Who We Are',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('whoweare', { locals });
})


router.get('/whatwedo', (req, res) => {

    const locals = {
        title: 'What We Do',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('whatwedo', { locals });
})

router.get('/accessNigeria', (req, res) => {

    const locals = {
        title: 'Programs & Events - Access Nigeria',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('accessNigeria', { locals });
})

router.get('/amplifyingVoices', (req, res) => {

    const locals = {
        title: 'Programs & Events - Amplifying Voices',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('amplifyingVoices', { locals });
})

router.get('/learningTogether', (req, res) => {

    const locals = {
        title: 'Programs & Events - Learning Together',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('learningTogether', { locals });
})

router.get('/makingitWork', (req, res) => {

    const locals = {
        title: 'Programs & Events - Making it Work',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('makingitWork', { locals });
})





// router.get('/newsUpdates', async (req, res) => {

//     const locals = {
//         title: 'News Updates',
//         description: 'The Inclusive Friends Association Website',
//         keywords: ['website', 'about', 'brand']
//     }

//     try {

//         const data = await Post.find();
//         res.render('newsUpdates', { locals, data });

//     } catch (error) {
//         console.log(error);
//     }
// })




router.get('/publications', async (req, res) => {
    try {

        const locals = {
            title: 'Publications',
            description: 'The Inclusive Friends Association Website',
            keywords: ['website', 'about', 'brand']
        }

        let perPage = 5;
        let page = req.query.page || 1;

        const docData = await Doc.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();

        const count = await Doc.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);

        // const data = await Post.find();
        res.render('publications', {
            locals,
            docData,
            current: page,
            nextPage: hasNextPage ? nextPage : null
        });

    } catch (error) {
        console.log(error);
    }
})

router.get('/reports', (req, res) => {

    const locals = {
        title: 'Reports',
        description: 'The Inclusive Friends Association Website',
        keywords: ['website', 'about', 'brand']
    }
    res.render('reports', { locals });
})


module.exports = router;