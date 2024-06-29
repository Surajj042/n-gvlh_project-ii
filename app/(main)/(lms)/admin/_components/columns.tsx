"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  CircleUserRound,
  MoreHorizontal,
  Pencil,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "picture",
    header: ({ column }) => {
      return <CircleUserRound className="w-5" />;
    },
    cell: ({ row }) => {
      const picture = row.getValue("picture");

      return (
        <div className="h-6 w-6">
          <Image
            src={picture as string}
            alt="user profile picture"
            width={100}
            height={100}
            className="h-full w-full rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   const name = row.getValue("name");

    //   return <div className="h-4 w-4">{name as string}</div>;
    // },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          {column.getIsSorted() === "asc" ? (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          ) : null}
        </Button>
      );
    },
    cell: ({ row }) => {
      const role = row.getValue("role");
      const badgeColor = role !== "TEACHER" ? "dark-gradient" : "purple2red";
      return typeof role === "string" ? (
        <Button variant={`${badgeColor}`} className="h-6">
          {role}
        </Button>
      ) : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { clerkId } = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="h-4 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={`/admin/${clerkId}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
