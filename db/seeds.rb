# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.destroy_all
Message.destroy_all

User.create! [
  {
    first: 'Brooklynn',
    username: 'bentleykindly',
    email: 'amimojo@icloud.com',
    password: '5qBUhaDz'
  },
  {
    first: 'Kierra',
    username: 'cleoluxuriant',
    email: 'jdhedden@yahoo.ca',
    password: 'ff6MN7Me'
  },
  {
    first: 'Dominique',
    username: 'cooperabiding',
    email: 'bryanw@outlook.com',
    password: 'fjJuRMYW',
  },
  {
    first: 'Korbin',
    username: 'marleyadvanced',
    email: 'giafly@verizon.net',
    password: '8RmBMUnm',
  },
  {
    first: 'Dayana',
    username: 'milliequack',
    email: 'dmiller@sbcglobal.net',
    password: 'gqucS3nX',
  },
  {
    first: 'Jayleen',
    username: 'roxyfond',
    email: 'frode@verizon.net',
    password: 'ZYBLjjh8',
  },
  {
    first: 'Michael',
    username: 'ravendoting',
    email: 'gomor@sbcglobal.net',
    password: 'EHg4mYUm',
  },
  {
    first: 'Talon',
    username: 'tangoavaricious',
    email: 'evilopie@att.net',
    password: '6FqeRBVR',
  },
  {
    first: 'Rene',
    username: 'otisgrave',
    email: 'mahbub@hotmail.com',
    password: 'n5Az8dep',
  },
  {
    first: 'Jordyn',
    username: 'zeusmedical',
    email: 'grdschl@aol.com',
    password: 'VrN3dJgJ',
  },
  {
    first: 'Jazlynn',
    username: 'rumorthrifty',
    email: 'hillct@optonline.net',
    password: 'ZYHJTCD2',
  }
]

Message.create! [
  { message: 'Don’t go through life. GROW through life.', user_id: 1 },
  { message: 'Turning up the volume is like zooming in, but with sound.', user_id: 2 },
  { message: 'Typo’s aren’t my biggest problem – Thinko’s are.', user_id: 3 },
  { message: 'I have something to say, it’s better to die young, than to fade away.', user_id: 4 },
  { message: 'Let your day be neither manic nor volcanic.', user_id: 5 },
  { message: 'Out of my mind. Back in five minutes.', user_id: 6 },
  { message: 'A hangover is the wrath of grapes.', user_id: 7 },
  { message: 'Attitude is infectious… Is yours worth catching?', user_id: 8 },
  { message: 'I don’t suffer from insanity, I enjoy every minute of it.', user_id: 2 },
  { message: 'Two wrongs don’t make a right, but three lefts do.', user_id: 3 }
]
