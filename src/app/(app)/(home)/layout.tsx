import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { Category } from '@/payload-types';
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
interface props {
    children: React.ReactNode
};

const Layout = async ({ children }: props) => {
    const payload = await getPayload({
        config: configPromise,
    });

    const data = await payload.find({
        collection: "categories",
        depth: 1, // populate subcategories
        pagination: false,
        where: {
            parent: {
                exists: false,
            },
        },
    });

    const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            // Because of "depth: 1" we are confident "doc" will be a type of "Category"
            ...(doc as Category),
        })),
    }));

    console.log({
        data,
        formattedData,
    });

    console.log(data);


    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <SearchFilters data={formattedData} />
            <div className="flex-1 bg-[#f4f4f0]">
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default Layout;