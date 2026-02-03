export default function Footer() {
  return (
    <footer className="border-t border-slate-200 mt-10 py-6">
      <div className="container text-sm text-slate-500">
        © {new Date().getFullYear()} store2. All rights reserved.
      </div>
    </footer>
  )
}
