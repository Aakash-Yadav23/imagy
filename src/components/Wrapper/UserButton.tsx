'use client'
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuthStore from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const UserButton = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  console.log("User", user)

  if (!user) {
    return (
      <Button variant="outline" className="px-4 py-2">
        Sign In
      </Button>
    );
  }

  const handlerLogout = () => {

    logout()
    router.push('/sign-in')

  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage
            src={'https://github.com/shadcn.png'}
            alt={`${user.firstName} ${user.lastName}`}
          />
          <AvatarFallback>
            {user.firstName.charAt(0)}
            {user.lastName.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={'https://github.com/shadcn.png'}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem onClick={handlerLogout}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;