"use client"
import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function ConditionalNavbar() {
  const pathname = usePathname()
  if (pathname?.startsWith("/products/")) return null
  return <Navbar />
}