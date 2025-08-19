"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-white font-medium text-xl">WATcourse?</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">

      </div>
      
      <div className="hidden md:flex items-center space-x-4">

      </div>
      
      <Button variant="ghost" size="icon" className="md:hidden text-white">
        <Menu className="w-6 h-6" />
      </Button>
    </nav>
  )
}
