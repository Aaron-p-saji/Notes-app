"use client";

import React, { useEffect, useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
  Pencil1Icon,
  PlusIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateNote } from "./CreateNote";
import { Textarea } from "../ui/textarea";
import { auth, db } from "@/providers/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export type Notes = {
  id: string;
  notes: string;
  title: string;
  userId: string;
};

export const columns: ColumnDef<Notes>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="pl-4">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "notes",
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Note
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Dialog>
        <DialogTrigger className="pl-4">View</DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-center gap-3">
            <DialogTitle className="text-white text-center ">
              <span className="font-bold text-lg">Title: </span>
              {row.getValue("title")}
            </DialogTitle>

            <DialogDescription className="text-center flex flex-col">
              <span className="font-bold text-xl text-white underline-offset-4 underline pb-[1vh]">
                Note
              </span>
              {row.getValue("notes")}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const createNote = async (
  userid: string,
  title: string,
  notes: string,
  createdAt: string
) => {
  try {
    const docRef = await addDoc(collection(db, "notesDb"), {
      userid,
      title,
      notes,
      createdAt,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export function DataTableDemo() {
  const [user] = useAuthState(auth);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [title, setTitle] = React.useState("");
  const [note, setNote] = React.useState("");
  const router = useRouter();
  const [data, setData] = useState<Notes[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  async function fetchNoted() {
    const querySnapshot = await getDocs(collection(db, "notesDb"));

    // Create an array to store the fetched data
    const fetchedNotes: Notes[] = [];

    querySnapshot.forEach((doc) => {
      if (user) {
        if (doc.data().userid === user.uid) {
          fetchedNotes.push({
            id: doc.id,
            notes: doc.data().notes,
            title: doc.data().title,
            userId: doc.data().userid,
          });
        }
      }
    });

    return fetchedNotes;
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const fetchedNotes = await fetchNoted();
      setData(fetchedNotes);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const now = new Date();
    const currentDateTimeString = now.toLocaleString();
    if (user) {
      const added = await createNote(
        user.uid,
        title,
        note,
        currentDateTimeString
      );
      if (added) {
        setTitle("");
        setNote("");
        toast.success("Note Created Successfully");
      } else {
        toast.error("Note Creation Failed");
      }
    } else {
      toast.error("Internal Server Error");
      router.push("/");
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="flex items-center py-4 justify-between">
          <Input
            placeholder="Search"
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm text-black"
          />
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="ml-auto text-white">
                  Create <PlusIcon className="ml-2 h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Create Note</SheetTitle>
                  <SheetDescription>Create a note</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 w-full">
                  <div className="flex flex-col items-center gap-4 text-white w-full">
                    <Input
                      id="title"
                      className="col-span-3 w-full"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className=" items-center flex flex-col justify-center gap-4 w-full ">
                    <Label className="text-right text-white">Note</Label>
                    <Textarea
                      placeholder="Write a note"
                      className="w-full min-h-1/2 text-white"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button
                      className="!w-[100%] hover:!bg-cyan-100 transition-all"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Save changes
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-gray-100">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="text-black">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                  <div className="rounded-full p-4 flex items-center space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.2s]"></div>
                    <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.4s]"></div>
                  </div>
                </div>
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="!hover:bg-transparent">
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center items-center justify-center space-y-4"
                  >
                    <p>No results.</p>
                    <Button
                      variant="outline"
                      className="ml-auto text-white hover:!bg-transparent hover:!text-black transition-all border-2"
                    >
                      Create <PlusIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-white"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
