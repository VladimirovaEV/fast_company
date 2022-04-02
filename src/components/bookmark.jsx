import React, { useState } from 'react';

const BookMark = () => {
    const [bookMark, setBookmark] = useState(false)

   if (bookMark) {
       return (
           <i onClick={() => setBookmark(false)} className="bi bi-bookmark-fill"></i>
       )
   }
   return (
       <i onClick={() => setBookmark(true)} className="bi bi-bookmark"></i>
   )
    

};

export default BookMark;