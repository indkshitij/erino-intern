import React from "react";
import { Github, Linkedin, Instagram, Mail, Globe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const links = [
    {
      name: "Portfolio",
      href: "https://kshitij-singh.onrender.com/",
      icon: <Globe className="text-orange-500" size={18} />,
    },
    {
      name: "Mail",
      href: "mailto:ind.kshitijsingh@gmail.com",
      icon: <Mail className="text-red-500" size={18} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/kshitijsingh07/",
      icon: <Linkedin className="text-blue-600" size={18} />,
    },
    {
      name: "GitHub",
      href: "https://github.com/indkshitij",
      icon: <Github className="text-gray-800" size={18} />,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/1kshitij/",
      icon: (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode"
          className="w-5 h-5"
        />
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/kkkshitij/",
      icon: <Instagram className="text-pink-500" size={18} />,
    },
    {
      name: "Linktree",
      href: "https://linktr.ee/1kshitij",
      icon: <Globe className="text-green-500" size={18} />,
    },
  ];

  return (
    <div className="w-full bg-purple-100/50  py-4 ">
      <div className=" mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-base text-gray-600">
          Made with <span className="text-red-500">❤️</span> by{" "}
          <span className="font-medium">Kshitij</span>
        </p>

        <div className="flex gap-3">
          <TooltipProvider>
            {links.map((link, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer rounded-full border-gray-300 hover:border-gray-500 hover:bg-gray-100 transition"
                    >
                      {link.icon}
                    </Button>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default Footer;
