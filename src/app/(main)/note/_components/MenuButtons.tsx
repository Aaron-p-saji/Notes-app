import React from "react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
type Props = {};

const MenuButtons = (props: Props) => {
  return (
    <div className="flex items-center">
      <Menubar className="!bg-transparent h-[5vh]">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Note <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Open <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Share <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSeparator />
            <MenubarItem>
              Print... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>
              Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarSub>
              <MenubarSubTrigger>Find</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Search the web</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Find...</MenubarItem>
                <MenubarItem>Find Next</MenubarItem>
                <MenubarItem>Find Previous</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>
              Reload <MenubarShortcut>⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled inset>
              Force Reload <MenubarShortcut>⇧⌘R</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Toggle Fullscreen</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Help</MenubarTrigger>
          <MenubarContent>
            <MenubarItem inset>Support</MenubarItem>
            <MenubarSeparator />
            <MenubarItem inset>Terms and Condition</MenubarItem>
            <MenubarItem inset>Privacy Policy</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default MenuButtons;
