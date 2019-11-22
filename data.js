const posts = [
  {
    id: 1,
    img: '/1.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1, 3],
    comments: [
      { id: 1, userId: 1, comment: 'Lorem ipsum dolor sit amet' },
      { id: 10, userId: 2, comment: 'Lorem ipsum dolor sit amet' }
    ]
  },
  {
    id: 2,
    img: '/2.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1, 2],
    comments: [{ id: 2, userId: 1, comment: 'Lorem ipsum dolor sit amet' }]
  },
  {
    id: 3,
    img: '/3.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1],
    comments: [
      { id: 3, userId: 1, comment: 'Lorem ipsum dolor sit amet' },
      { id: 11, userId: 3, comment: 'Lorem ipsum dolor sit amet' },
      { id: 12, userId: 2, comment: 'Lorem ipsum dolor sit amet' }
    ]
  },
  {
    id: 4,
    img: '/4.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1, 2, 3],
    comments: [{ id: 4, userId: 1, comment: 'Lorem ipsum dolor sit amet' }]
  },
  {
    id: 5,
    img: '/5.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1],
    comments: [
      { id: 5, userId: 1, comment: 'Lorem ipsum dolor sit amet' },
      { id: 13, userId: 3, comment: 'Lorem' },
      { id: 14, userId: 3, comment: 'ipsum dolor' },
      { id: 15, userId: 3, comment: 'sit amet' }
    ]
  },
  {
    id: 6,
    img: '/6.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1],
    comments: [{ id: 6, userId: 1, comment: 'Lorem ipsum dolor sit amet' }]
  },
  {
    id: 7,
    img: '/7.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1, 2],
    comments: [{ id: 7, userId: 1, comment: 'Lorem ipsum dolor sit amet' }]
  },
  {
    id: 8,
    img: '/8.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [1, 3],
    comments: [
      { id: 8, userId: 1, comment: 'Lorem ipsum dolor sit amet' },
      { id: 16, userId: 3, comment: 'Lorem ipsum dolor' }
    ]
  },
  {
    id: 9,
    img: '/9.png',
    shortDescription: 'Lorem ipsum dolor sit amet #hashtag',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua #hashtag',
    likes: [2],
    comments: [{ id: 9, userId: 1, comment: 'Lorem ipsum dolor sit amet' }]
  }
];

const users = [
  {
    id: 1,
    fullName: 'UserName1',
    login: 'username1',
    email: 'user1@usermail.com',
    password: '1'
  },
  {
    id: 2,
    fullName: 'qq',
    login: 'q',
    email: 'q@q',
    password: 'q'
  },
  {
    id: 3,
    fullName: 'Alexander',
    login: 'alex',
    email: 'alex@mail',
    password: 'alex'
  }
];

const lastUserId = 3;
const lastCommentId = 16;

module.exports = { posts, users, lastUserId, lastCommentId };
