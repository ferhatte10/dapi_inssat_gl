const { article, category, user_entity } = require('../configs/db/config/db');

const articleSeeder = async () => {
  try {

    // Check if the category already exists in the database
    const alreadySeededCategory = await article.findOne({
        where: { title: 'already_been_seeded' }
      });

    //find last inserted user id 
    let lastInsertedUser = await user_entity.findOne({
        attributes: ['ID'],
        order: [
            ['ID', 'DESC']
        ]
    });


    const lastInsertedCategory = await category.findOne({
        attributes: ['id'],
        order: [
            ['id', 'ASC']
        ]
    });
    
    if(!alreadySeededCategory)
   {
    if(!lastInsertedUser || !lastInsertedCategory)
    return 0;

       lastInsertedUser = {
            ID: 'c6688fa2-daa6-45a2-b490-28a29303ed2d' //   new-manager id
       }
        // Sample data to be inserted
        const articles = [
            {
                title: 'Exploring the Wonders of Nature',
                description: 'Discover the beauty and mysteries of nature as we take you on a journey through breathtaking landscapes and fascinating ecosystems.',
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, felis vel eleifend sodales, augue urna tincidunt lacus, at facilisis justo ligula vel nisl.',
                status: 'Published',
                flag_count: 0,
                like_count: 15,
                is_pinned: true,
                is_blacklisted: false,
                comment_authorized: true,
                published_at: new Date('2023-11-14T12:00:00Z'),
                thumbnail: 'default-thumbnail.png',
                principal_image: 'default-principal-image.png',
                author_id: lastInsertedUser.ID,
                category_id: lastInsertedCategory.id,
              },
              {
                title: 'The Art of Photography: Capturing Moments',
                description: 'Explore the world of photography and learn how to capture meaningful moments that last a lifetime. From composition techniques to post-processing tips, we ve got you covered.',
                content: 'Duis auctor luctus lacinia. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed accumsan purus eu ullamcorper bibendum.',
                status: 'Draft',
                flag_count: 0,
                like_count: 8,
                is_pinned: false,
                is_blacklisted: false,
                comment_authorized: true,
                published_at: new Date('2021-12-10T09:30:00Z'),
                thumbnail: 'default-thumbnail.png',
                principal_image: 'default-principal-image.png',
                author_id: lastInsertedUser.ID,
                category_id: lastInsertedCategory.id,
              },
              {
                title: 'Healthy Living: A Guide to Wellness',
                description: 'Embark on a journey towards a healthier and happier life. Discover nutritious recipes, effective workout routines, and mindfulness practices for overall well-being.',
                content: 'Vivamus vel mauris ac turpis euismod placerat. Integer feugiat odio sit amet aliquet malesuada. Sed tristique tincidunt fringilla. Nulla facilisi.',
                status: 'Published',
                flag_count: 2,
                like_count: 20,
                is_pinned: false,
                is_blacklisted: false,
                comment_authorized: true,
                published_at: new Date('2023-11-10T09:30:00Z'),
                thumbnail: 'default-thumbnail.png',
                principal_image: 'default-principal-image.png',
                author_id: lastInsertedUser.ID,
                category_id: lastInsertedCategory.id,
              },
              {
                title: 'Tech Trends: Innovations Shaping the Future',
                description: 'Stay updated on the latest technological advancements and trends that are reshaping our world. From artificial intelligence to blockchain, we delve into the future of tech.',
                content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur tincidunt nunc at nulla sagittis, non auctor odio semper.',
                status: 'Published',
                flag_count: 1,
                like_count: 12,
                is_pinned: false,
                is_blacklisted: false,
                comment_authorized: true,
                published_at: new Date('2023-11-08T15:45:00Z'),
                thumbnail: 'default-thumbnail.png',
                principal_image: 'default-principal-image.png',
                author_id: lastInsertedUser.ID,
                category_id: lastInsertedCategory.id,
              },
              {
                title: 'Culinary Delights: A Gastronomic Adventure',
                description: 'Embark on a gastronomic journey exploring diverse cuisines, unique recipes, and culinary traditions from around the world. Get ready for a feast of flavors!',
                content: 'Ut tincidunt quam vitae diam vulputate, eu sodales elit sodales. Sed facilisis dolor in lectus efficitur, eu auctor justo fermentum. Aenean euismod sem eget elit iaculis, ac varius purus vulputate.',
                status: 'Published',
                flag_count: 0,
                like_count: 18,
                is_pinned: false,
                is_blacklisted: false,
                comment_authorized: true,
                published_at: new Date('2023-11-05T18:20:00Z'),
                thumbnail: 'default-thumbnail.png',
                principal_image: 'default-principal-image.png',
                author_id: lastInsertedUser.ID,
                category_id: lastInsertedCategory.id,
              },
        {
            title: 'already_been_seeded',
            description: 'Description for Sample article 2',
            content: 'Content for Sample article 2',
            thumbnail: 'default-thumbnail.png',
            principal_image: 'default-principal-image.png',
            status: 'Draft',
            flag_count: 0,
            like_count: 0,
            is_pinned: false,
            is_blacklisted: false,
            comment_authorized: true, 
            published_at: new Date(),
            author_id: lastInsertedUser.ID, 
            category_id: lastInsertedCategory.id, 
        },
    
        ];

        // Use the create method to insert data into the 'article' table
        const data = await article.bulkCreate(articles);

        console.log('Articles seeded successfully');
        return data;
    }
    else {
        console.log('Category with title "already_been_seeded" already exists. Skipping seeding.');
      }
  } catch (error) {
    console.error('article seeder error:', error);
  }

  return false;
};

module.exports = articleSeeder;
