要求5位的数字/字母短网址，所以Hash后的code是26*2+10=62Base。
用MongoDB，给提交的网址生成一个id，这个id只需要在62(62^5-1)/61范围内，都可以做到一对一的bijection。
如果超过这个范围，覆盖掉least used id。可以用一个priority queue implement。（此处可选）
数据库Schema：（可以画一个ER图）
Relation 网站：
id (num) max = 930909167
url
most recent access time = (set up time)

Node.js 或Angular.js中进行hash。出于安全性考虑，最好还是node.js后台。
DB应在safemode中运行，为效率先取消。前端用angularJS binding。

MongoDB example:
>> created short URL:
{ _id: 57255cf98a0d22213d537356,
  URL: 'http://www.google.com/',
  data: null,
  hash: '67a17',
  created_at: Sat Apr 30 2016 20:33:45 GMT-0500 (中部夏令时),
  hits: 21 }
>> retrieving short URL: 67a17
>> retrieve result:
{ _id: 57255cf98a0d22213d537356,
  URL: 'http://www.google.com/',
  data: null,
  hash: '67a17',
  created_at: Sat Apr 30 2016 20:33:45 GMT-0500 (中部夏令时),
  hits: 21 }

注：我还是喜欢SQL。

Testing:
Mongoose: shorturls.ensureIndex({ URL: 1 }) { unique: false, background: true, safe: undefined }  
Mongoose: shorturls.findOne({ URL: 'http://nodejs.org/' }) { fields: undefined }  
Mongoose: shorturls.findOne({ URL: 'http://www.nyan.cat/' }) { fields: undefined }  
Mongoose: shorturls.find({}) { fields: undefined }  
Mongoose: shorturls.findOne({ URL: 'https://www.youtube.com/watch?v=qvsgGtivCgs' }) { fields: undefined }  
Mongoose: shorturls.insert({ hash: 'google', URL: 'https://www.google.com', data: null, _id: ObjectId("5725ad441083fc10df60ab12"), created_at: new Date("Sun, 01 May 2016 07:16:20 GMT"), hits: 0 })   
Mongoose: shorturls.ensureIndex({ hash: 1 }) { unique: true, background: true, safe: undefined }  
·····Mongoose: shorturls.findOne({ hash: 'bd4051' }) { fields: undefined }  
Mongoose: shorturls.update({ hash: 'bd4051' }) { '$inc': { hits: 1 } } { multi: true } 
Mongoose: shorturls.insert({ URL: 'https://www.youtube.com/watch?v=qvsgGtivCgs', data: { type: 'trailer' }, hash: 'df0d6', _id: ObjectId("5725ad441083fc10df60ab13"), created_at: new Date("Sun, 01 May 2016 07:16:20 GMT"), hits: 0 })   
Mongoose: shorturls.insert({ URL: 'http://www.nyan.cat/', data: null, hash: 'dc137', _id: ObjectId("5725ad441083fc10df60ab14"), created_at: new Date("Sun, 01 May 2016 07:16:20 GMT"), hits: 0 })   
·Mongoose:· shorturls.findOne({ hash: ·'df0d6'· }) { fields: ·undefined }  
Mongoose: shorturls.insert({ hash: 'nyan', URL: 'http://www.nyan.cat/', data: null, _id: ObjectId("5725ad441083fc10df60ab15"), created_at: new Date("Sun, 01 May 2016 07:16:20 GMT"), hits: 0 })   
Mongoose: shorturls.update({ _id: ObjectId("5725ad441083fc10df60ab13") }) { '$set': { URL: 'http://www.youtube.com/watch?v=qvsgGtivCgs', data: { movie: 'Back To The Future', type: 'movie-trailer' } } }  
Mongoose: shorturls.findOne({ hash: 'df0d6' }) { fields: undefined }  
Mongoose: shorturls.update({ hash: 'df0d6' }) { '$inc': { hits: 1 } } { multi: true } 
······ ✓ OK » 17 honored (0.147s) 

Credit:
npm short
npm deviare
codeschool angularJS

Miscell.:
Environment: JetBrains WebStorm 10.0.4
MongoDB R2: Running on port 27017.