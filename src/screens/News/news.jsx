import React from 'react'
import NewsCard from '../../components/newsCard'

const News = () => {
    return <>
        <div className='mx-auto w-full p-24 grid-cols-1 lg:grid-cols-3 grid gap-10'>
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
        </div>

    </>

}

export default News