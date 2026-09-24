import Link from 'next/link'

export default function ProductsPage() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold">My 8 Products</h1>
      <div className="mt-6">
        <Link href="/products/rankengine">→ RankEngine</Link><br/>
        <Link href="/products/academiabase">→ AcademiaBase</Link>
      </div>
    </main>
  )
}