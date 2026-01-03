import { Link } from "@inertiajs/react";
import { Separator } from "../ui/separator";
import { ReactNode } from "react";

type DashboardCard = {
    href?: string;
    children?: ReactNode;
    title?: string;
    sum?: number;
}


const DashboardCard = ({href, children, title, sum }:DashboardCard) => {
    return (
        <Link
            href={href}
            className="link"
            aria-label="student"
            title="students"
        >
            <h3 className="mb-2 flex items-center gap-2 text-lg xl:text-2xl font-medium">
                {title}
                {children}
            </h3>
            <Separator className="dark:bg-slate-500 bg-slate-300" />
            <h3 className="py-8 text-3xl xl:text-4xl">{sum ?? 0}</h3>
            <Separator className="dark:bg-slate-500 bg-slate-300" />
            <p className="p-tag">{title} in your School</p>
        </Link>
    );
};

export default DashboardCard;
