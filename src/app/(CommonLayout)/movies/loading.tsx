
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative h-16 w-16 mb-4">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-indigo-400 animate-spin" />
        <div className="absolute inset-[14px] rounded-full bg-indigo-500/20 blur-sm animate-pulse" />
      </div>
      <p className="text-slate-300 text-sm tracking-widest uppercase animate-pulse">
        Loading Movies…
      </p>
    </div>

  )
}

export default Loading