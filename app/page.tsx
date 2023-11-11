"use client";
import Image from "next/image";
import bitcoin from "./../bitcoin.json";
import loading from "./../bit-loading.json";
import success from "./../success.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Lottie from "lottie-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import TransactionStatus from "./TransactionStatus";
import Link from "next/link";
import { BiLogoBitcoin } from "react-icons/bi";
const formSchema = z.object({
  bitcoin: z
    .number({ required_error: "Please enter aleast 1 digit numbers" })
    .min(1, {
      message: "You should buy aleast 1 bitcon to proceed this transaction",
    }),
});

export default function Home() {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // bitcoin: 10,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setOpen((prev) => !prev);
  }

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to set isVisible to false after 5 seconds
    let timeout: any;
    if (open) {
      console.log("now false");

      timeout = setTimeout(() => {
        setIsVisible(false);
      }, 6000);
    }

    // Clear the timeout to prevent memory leaks
    return () => {
      if (!open) {
        clearTimeout(timeout);
        setIsVisible(true);
        console.log("now true");
      }
    };
  }, [open]);

  return (
    <div className="h-[100dvh] w-screen flex justify-center items-center flex-col p-8">
      <Lottie animationData={bitcoin} loop={true} className={`flex`} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="bitcoin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Buy bitcoin</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter amount here..."
                    {...field}
                    onChange={(e) =>
                      form.setValue("bitcoin", e.target.valueAsNumber)
                    }
                    type="number"
                  />
                </FormControl>
                <FormDescription>
                  The bitcoin count should be aleast 2 digit number to 8 digit
                  numbers
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="space-x-1">
            <span>Buy now</span> <BiLogoBitcoin size={22} />
          </Button>
        </form>
      </Form>

      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="max-w-[320px] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {`You are buying ${form.getValues().bitcoin} Bitcoins`}{" "}
            </DialogTitle>
            <DialogDescription>
              <TransactionStatus />
            </DialogDescription>
          </DialogHeader>
          <div className="w-full flex justify-center items-center h-60 ">
            <Lottie
              animationData={loading}
              loop={true}
              className={`${isVisible ? `flex` : `hidden`} h-60 w-60`}
            />

            <Lottie
              animationData={success}
              loop={true}
              className={`${
                !isVisible ? `flex` : `hidden`
              } object-cover h-60 w-60`}
            />
          </div>
          <DialogFooter className="w-full flex">
            <DialogClose asChild className="w-full">
              <Button className="w-full">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="absolute bottom-10">
        <TwitterFollowButton screenName={"asitdixitt"} />
      </div>

      <p className="absolute bottom-[8px] space-x-1 ">
        <span className="text-sm">Currently building</span>
        <Link
          href={"https://buildrbase.com/"}
          className="text-blue-600 text-md font-medium underline"
        >
          buildrbase.com
        </Link>
      </p>
    </div>
  );
}
