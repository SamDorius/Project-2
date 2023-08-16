import { Link } from "react-router-dom"

export default function Product()
{
    return (
        <>
            <h1>This Is Your Product Page Foo</h1>
            <Link className="link" to="/">Return to Home Page</Link>
        </>
    )
}