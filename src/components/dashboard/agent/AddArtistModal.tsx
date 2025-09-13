"use client";

import type React from "react";

import { useState } from "react";
import { UserPlus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddArtistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddArtistModal({ open, onOpenChange }: AddArtistModalProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Adding artist with email:", email);
    setEmail("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='flex flex-row items-center justify-between space-y-0 pb-4'>
          <div className='flex items-center gap-2'>
            <UserPlus className='h-5 w-5 text-muted-foreground' />
            <DialogTitle className='text-lg font-semibold'>
              Add Artist
            </DialogTitle>
          </div>
          <Button
            variant='ghost'
            size='icon'
            onClick={() => onOpenChange(false)}
            className='h-6 w-6 rounded-full'
          >
            <X className='h-4 w-4' />
          </Button>
        </DialogHeader>

        <div className='space-y-4'>
          <p className='text-sm text-muted-foreground'>
            Expand your roster—add a new artist today!
          </p>

          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              type='email'
              placeholder='Enter mail address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full'
              required
            />

            <div className='flex gap-3 pt-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => onOpenChange(false)}
                className='flex-1'
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='flex-1 bg-primary hover:bg-primary/90'
              >
                Confirm
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
