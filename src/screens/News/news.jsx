import React, { useEffect, useState } from "react";
import { fetchArticles } from "../../controllers/firebase/auth";
import NewsCard from '../../components/newsCard'

const News = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getArticles = async () => {
            try {
                const fetchedArticles = await fetchArticles();
                setArticles(fetchedArticles);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        getArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    return <>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-24">
            {articles.map((article, index) => (
                <NewsCard key={index} data={article} />
            ))}
        </div>


    </>


}



export default News






