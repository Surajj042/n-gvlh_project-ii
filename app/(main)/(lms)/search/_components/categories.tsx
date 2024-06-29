"use client";

import { IconType } from "react-icons";
import {
    FcEngineering,
    FcFilmReel,
    FcMultipleDevices,
    FcMusic,
    FcOldTimeCamera,
    FcSalesPerformance,
    FcSportsMode
} from "react-icons/fc";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
    items: any[];
}

const iconMap: Record<any["name"], IconType> = {
    "Music": FcMusic,
    "Photography": FcOldTimeCamera,
    "Fitness": FcSportsMode,
    "Accounting": FcSalesPerformance,
    "Computer Science": FcMultipleDevices,
    "Filming": FcFilmReel,
    "Engineering": FcEngineering,
};

export const Categories = ({
    items,
}: CategoriesProps) => {

    return (
        <div className="flex items-center gap-x-2 overflow-x-auto custom-scrollbar pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item._id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item._id}
                />
            ))}
        </div>
    )
}