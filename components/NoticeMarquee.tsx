import React from 'react'

function NoticeMarquee() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-r from-[#01492a] via-emerald-700 to-[#01492a] shadow-md">
      <div className="absolute left-0 top-0 z-10 h-full px-5 flex items-center bg-[#01311d] border-r border-white/20">
        <span className="text-white font-bold text-sm md:text-base">
          📢 NOTICE
        </span>
      </div>

      <div className="whitespace-nowrap py-4 pl-32 pr-5 text-white font-medium text-sm md:text-base animate-marquee">
      এই dashboard টি একটি demo account। শুধুমাত্র demo
        দেখানোর উদ্দেশ্যে তৈরি করা হয়েছে। এখানে প্রদর্শিত সকল তথ্য, রোগীর তথ্য,
        prescription এবং data sample/demo purposes-এর জন্য ব্যবহৃত হয়েছে।
      </div>
    </div>
  );
}

export default NoticeMarquee