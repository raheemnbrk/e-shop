export default function Category(props) {
    const categories = [...new Set(props.products.map(ele => ele.category))]
    return (
        <>
            <div>
                <ul className="flex flex-wrap gap-8 items-center justify-center">
                    {categories.map(ele => (
                        <li className="text-light-text text-xl capitalize cursor-pointer border-2 border-light-text rounded-lg px-4 py-2">{ele}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}