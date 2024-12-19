import React from 'react'

const NewsCard = (props) => {
    const { data } = props;
    return (
        <article className="overflow-hidden w-128 h-autorounded-lg border border-gray-100 bg-white shadow-sm">
            <img
                alt=""
                src={data.image_url}
                className="h-56 w-full object-cover"
            />

            <div className="p-4 sm:p-6">
                <a href="#">
                    <h3 className="text-lg font-medium text-gray-900">
                        {data.title}
                    </h3>
                </a>

                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {data.place}
                </p>

                <a href={data.url} className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                    Find out more

                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                        &rarr;
                    </span>
                </a>
            </div>
        </article>
    )
}

export default NewsCard
