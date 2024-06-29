"use client";

import { sidebarLinks, teacherLinks } from "@/constants";
import { useMyContext } from "@/context/teacherContext";
import { SidebarLink, SubLink } from "@/types";
import { useAuth } from "@clerk/nextjs";
import * as Accordion from "@radix-ui/react-accordion";
import { AccordionContent, AccordionTrigger } from "@radix-ui/react-accordion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type RotatedDivsState = {
  [key: number]: boolean;
};

const SidebarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth();
  const { checkTeacher } = useMyContext();
  const [rotatedDivs, setRotatedDivs] = useState<RotatedDivsState>({});

  const handleClick = (index: number) => {
    setRotatedDivs((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section className="light-border sticky left-0 top-0 flex flex-col justify-between px-5 py-3 shadow-light-300 dark:shadow-none">
      {checkTeacher && (
        <div>
          <Accordion.Root className="AccordionRoot" type="multiple">
            {teacherLinks.map((item: SidebarLink, index) => {
              const isActive =
                (pathname.includes(item.route) && item.route.length > 1) ||
                pathname === item.route;

              if (item.route === "/profile") {
                if (userId) {
                  item.route = `${item.route}/${userId}`;
                } else {
                  return null;
                }
              }

              const hasSubLink = typeof item.subLinks !== "undefined";

              return (
                <Accordion.Item
                  className="AccordionItem"
                  value={item.route}
                  key={item.route}
                >
                  <Link
                    key={item.route}
                    href={item.route}
                    className={`${
                      !hasSubLink && isActive
                        ? "lyellow2lpink rounded-[6px]"
                        : "text-dark300_light900"
                    } flex bg-transparent`}
                  >
                    <AccordionTrigger
                      key={item.route}
                      onClick={() => handleClick(index)}
                      className="flex w-full items-center justify-between"
                    >
                      <div
                        className={`flex items-center justify-start gap-4 bg-transparent px-3 py-4`}
                      >
                        <Image
                          src={item.imgURL}
                          alt={item.label}
                          width={20}
                          height={20}
                        />
                        <p
                          className={`${
                            isActive
                              ? "base-bold text-pink2blue"
                              : "base-medium"
                          }`}
                        >
                          {item.label}
                        </p>
                      </div>
                      {hasSubLink && (
                        <Image
                          src="/sidebar/dropdown.svg"
                          alt="dropdown button"
                          width={16}
                          height={16}
                          className={`${rotatedDivs[index] ? "rotate-90" : "rotate-0"} transition-transform duration-300 ease-in-out`}
                        />
                      )}
                    </AccordionTrigger>
                  </Link>

                  {hasSubLink && (
                    <AccordionContent>
                      <div className="ml-5">
                        {item.subLinks!.map((subItem: SubLink) => {
                          const isActive =
                            (pathname.includes(subItem.route) &&
                              subItem.route.length > 1) ||
                            pathname === subItem.route;
                          return (
                            <Link
                              key={subItem.route}
                              href={subItem.route}
                              className={`${
                                isActive
                                  ? "lyellow2lpink rounded-[6px]"
                                  : "text-dark300_light900"
                              } flex items-center justify-start gap-4 bg-transparent p-2`}
                            >
                              <Image
                                src="/sidebar/list.svg"
                                alt={subItem.label}
                                width={20}
                                height={20}
                              />
                              <p
                                className={`${
                                  isActive
                                    ? "base-bold text-pink2blue"
                                    : "base-medium"
                                }`}
                              >
                                {subItem.label}
                              </p>
                            </Link>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  )}
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </div>
      )}
      <div className={`flex flex-1 flex-col gap-3`}>
        <Accordion.Root className="AccordionRoot" type="multiple">
          {sidebarLinks.map((item: SidebarLink, index) => {
            const isActive =
              (pathname.includes(item.route) && item.route.length > 1) ||
              pathname === item.route;

            if (item.route === "/profile") {
              if (userId) {
                item.route = `${item.route}/${userId}`;
              } else {
                return null;
              }
            }

            const hasSubLink = typeof item.subLinks !== "undefined";

            return (
              <Accordion.Item
                className="AccordionItem"
                value={item.route}
                key={item.route}
              >
                <Link
                  key={item.route}
                  href={item.route}
                  className={`${
                    !hasSubLink && isActive
                      ? "lyellow2lpink rounded-[6px]"
                      : "text-dark300_light900"
                  } flex bg-transparent`}
                >
                  <AccordionTrigger
                    key={item.route}
                    onClick={() => handleClick(index)}
                    className="flex w-full items-center justify-between"
                  >
                    <div
                      className={`flex items-center justify-start gap-4 bg-transparent px-3 py-4`}
                    >
                      <Image
                        src={item.imgURL}
                        alt={item.label}
                        width={20}
                        height={20}
                      />
                      <p
                        className={`${
                          isActive ? "base-bold text-pink2blue" : "base-medium"
                        }`}
                      >
                        {item.label}
                      </p>
                    </div>
                    {hasSubLink && (
                      <Image
                        src="/sidebar/dropdown.svg"
                        alt="dropdown button"
                        width={16}
                        height={16}
                        className={`${rotatedDivs[index] ? "rotate-90" : "rotate-0"} transition-transform duration-300 ease-in-out`}
                      />
                    )}
                  </AccordionTrigger>
                </Link>

                {hasSubLink && (
                  <AccordionContent>
                    <div className="ml-5">
                      {item.subLinks!.map((subItem: SubLink) => {
                        const isActive =
                          (pathname.includes(subItem.route) &&
                            subItem.route.length > 1) ||
                          pathname === subItem.route;
                        return (
                          <Link
                            key={subItem.route}
                            href={subItem.route}
                            className={`${
                              isActive
                                ? "lyellow2lpink rounded-[6px]"
                                : "text-dark300_light900"
                            } flex items-center justify-start gap-4 bg-transparent p-2`}
                          >
                            <Image
                              src="/sidebar/list.svg"
                              alt={subItem.label}
                              width={20}
                              height={20}
                            />
                            <p
                              className={`${
                                isActive
                                  ? "base-bold text-pink2blue"
                                  : "base-medium"
                              }`}
                            >
                              {subItem.label}
                            </p>
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                )}
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      </div>
    </section>
  );
};

export default SidebarRoutes;
