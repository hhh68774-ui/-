/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  User, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Droplets, 
  Clock, 
  Calendar, 
  Sparkles,
  HelpCircle,
  Home,
  LogOut,
  Camera,
  Loader2,
  Download,
  RefreshCw,
  MessageSquare,
  Send,
  UserCircle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { STUDENTS } from './students';

// --- Types ---

interface WindowContent {
  id: number;
  title: string;
  icon: React.ReactNode;
  color: string;
  content: React.ReactNode;
  videoUrl?: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// --- Data ---

const WINDOWS: WindowContent[] = [
  {
    id: 1,
    title: "تعريف الحيض وصفاته",
    icon: <Droplets className="w-6 h-6" />,
    color: "bg-rose-50",
    videoUrl: "https://g.top4top.io/m_3721ajvzm1.mp4",
    content: (
      <div className="space-y-6 text-right" dir="rtl">
        <div className="bg-gradient-to-br from-rose-600 to-pink-400 p-5 rounded-2xl text-white shadow-lg">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <Info className="w-5 h-5" />
            تعريف الحيض (لغةً وشرعاً)
          </h3>
          <div className="space-y-3 text-sm leading-relaxed">
            <p><span className="font-bold underline">لغةً:</span> الفيض، وقيل السيلان، وقيل الانفجار. ومنه قولهم: حاض الوادي إذا سال وفاض. ويرجح سماحة الشيخ الخليلي أنه بمعنى الفيض وإن لم يسل.</p>
            <p><span className="font-bold underline">اصطلاحاً (شرعاً):</span> هو دم جبلة (طبيعي) يخرج من قُبل المرأة في أوقات معلومة، يفرزه رحم المرأة بعد بلوغها سن التاسعة وقبل وصولها سن الإياس (الستين).</p>
            <p><span className="font-bold underline">أهميته:</span> هو علامة على البلوغ وصحة المرأة، وتترتب عليه أحكام شرعية هامة في العبادات (الصلاة، الصيام، الحج) والمعاملات (العدة، الاستبراء).</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm">
          <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            صفات دم الحيض الخمس
          </h4>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="flex items-start gap-3 p-3 bg-rose-50/30 rounded-xl">
              <div className="w-2 h-2 bg-rose-900 rounded-full mt-1.5 shrink-0"></div>
              <p><span className="font-bold text-rose-900">1. اللون:</span> يكون أسود (داكن جداً) أو أحمر قانٍ. فإذا كان رقيقاً وفاتحاً في بدايته فهو استحاضة.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-50/30 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0"></div>
              <p><span className="font-bold text-rose-900">2. الثخانة:</span> يكون غليظاً (خاثراً) وثخيناً، ولا يتجمد (لا يتجلط) بخلاف دم الجروح الذي يتجمد إذا خرج.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-50/30 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0"></div>
              <p><span className="font-bold text-rose-900">3. الرائحة:</span> يتميز برائحة كريهة (منتن الرائحة) تميزه عن دم الاستحاضة الذي لا رائحة له.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-50/30 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0"></div>
              <p><span className="font-bold text-rose-900">4. الحرارة:</span> يخرج بحرارة وحرقة غالباً، فتشعر المرأة بحرارته عند خروجه.</p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-rose-50/30 rounded-xl">
              <div className="w-2 h-2 bg-rose-500 rounded-full mt-1.5 shrink-0"></div>
              <p><span className="font-bold text-rose-900">5. المصدر:</span> يخرج من قعر الرحم، بخلاف الاستحاضة التي تخرج من عرق العاذل في أدنى الرحم.</p>
            </div>
          </div>
        </div>

        <div className="bg-rose-50 p-5 rounded-2xl border-2 border-rose-200">
          <h4 className="font-bold text-rose-900 mb-3">كيفية التفتيش (الاستبراء)</h4>
          <p className="text-sm text-rose-800 leading-relaxed">
            يجب على المرأة أن تتحقق من نزول الدم أو انقطاعه بمسح الموضع بقطنة أو منديل ورقي (يسمى العلم) <span className="font-bold">عرضاً وليس طولاً</span>.
            <br />
            <span className="font-bold underline">الوضعية الصحيحة:</span> تكون في وضعية القيام والقعود (كهيئة الراكعة) لضمان دقة النتيجة وخروج ما قد يكون محتبساً.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "سن الحيض ومدته",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-amber-50",
    videoUrl: "https://h.top4top.io/m_3721m9m1c2.mp4",
    content: (
      <div className="space-y-6 text-right" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              سن الحيض (هجري)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-bold">البداية:</span> تمام السنة التاسعة هجرية. أي دم قبل هذا السن لا يعتبر حيضاً بل دم علة وفساد.</li>
              <li>• <span className="font-bold">سن الإياس:</span> السن الذي ينقطع فيه الحيض، والراجح عند علماء الإباضية أنه عند الستين سنة هجرية.</li>
            </ul>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm">
            <h4 className="font-bold text-amber-800 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              مدة الحيض (بالساعات)
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <span className="font-bold text-amber-600">أقل الحيض:</span> ثلاثة أيام بلياليها (72 ساعة كاملة).</li>
              <li>• <span className="font-bold text-red-600">أكثر الحيض:</span> عشرة أيام بلياليها (240 ساعة كاملة).</li>
              <li>• <span className="font-bold text-indigo-600">أقل الطهر:</span> عشرة أيام بلياليها (الفاصل بين حيضتين).</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-600 to-yellow-400 p-5 rounded-2xl text-white shadow-md">
          <h4 className="font-bold mb-3">قاعدة حساب الأيام بالساعات</h4>
          <p className="text-sm leading-relaxed">
            تحسب الأيام بالساعات بدقة؛ فإذا بدأ الدم في الساعة العاشرة صباحاً يوم السبت، فإن يوماً كاملاً ينتهي في الساعة العاشرة صباحاً يوم الأحد. 
            <br />
            <span className="font-bold">تنبيه هام:</span> إذا نقص الدم عن 72 ساعة (ولو بدقيقة واحدة) فلا يعتبر حيضاً بل استحاضة، ويجب قضاء الصلوات التي تركتها.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-amber-100">
          <h4 className="font-bold text-amber-800 mb-3">ما يحرم على الحائض (8 أمور):</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-700">
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>1. الصلاة (فرضاً ونفلاً) وتسقط عنها ولا تقضيها.</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>2. الصيام (ويجب قضاؤه بعد الطهر).</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>3. الطواف بالبيت (الكعبة).</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>4. المكث في المسجد (ويجوز العبور للضرورة).</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>5. قراءة القرآن (بمس المصحف الورقي).</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>6. مس المصحف مباشرة.</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>7. سجدة التلاوة.</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-amber-50 rounded-lg">
              <XCircle className="w-4 h-4 text-red-500" />
              <span>8. سجدة الشكر.</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "الانتظار واستقرار العادة",
    icon: <Clock className="w-6 h-6" />,
    color: "bg-emerald-50",
    videoUrl: "https://i.top4top.io/m_3721e5p4u3.mp4",
    content: (
      <div className="space-y-6 text-right" dir="rtl">
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm">
          <h3 className="font-bold text-emerald-800 mb-3">مفهوم الانتظار (الاستبراء)</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            هو الفترة التي تنتظرها المرأة المعتادة بعد انقطاع دمها في أيام عادتها، لتتأكد من طهرها التام قبل أن تغتسل وتصلي. أيام الانتظار لها حكم الحيض في ترك الصلاة وقضاء الصيام.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-400 p-5 rounded-2xl text-white">
            <h4 className="font-bold mb-2 text-sm">1. انتظار الدم</h4>
            <p className="text-xs opacity-90">إذا انقطع الدم تماماً قبل تمام عادتها، تنتظر المرأة <span className="font-bold">يومين (48 ساعة)</span>، بشرط ألا يتجاوز المجموع مع أيام الدم 10 أيام. فإذا طهرت في اليوم الخامس وعادتها سبعة، تنتظر يومين ثم تغتسل.</p>
          </div>
          <div className="bg-emerald-400 p-5 rounded-2xl text-white">
            <h4 className="font-bold mb-2 text-sm">2. انتظار التوابع</h4>
            <p className="text-xs opacity-90">إذا رأت كدرة أو صفرة بعد الدم، تنتظر <span className="font-bold">يوماً وليلة (24 ساعة)</span>. وإذا استمرت التوابع حتى اليوم العاشر، تغتسل في نهايته وتصلي.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border-2 border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-4">أحوال العادة واستقرارها:</h4>
          <div className="space-y-4 text-sm text-gray-700">
            <div className="p-3 bg-emerald-50 rounded-xl">
              <span className="font-bold text-emerald-700">استقرار العادة:</span> تستقر العادة إذا تكررت الحيضة بنفس المدة والوقت <span className="font-bold">ثلاث مرات متتالية</span>. وفي المرة الرابعة تعتبر عادة ثابتة.
            </div>
            <div className="p-3 bg-emerald-50 rounded-xl">
              <span className="font-bold text-emerald-700">تغير العادة (3 حالات):</span> 
              <ul className="mt-2 space-y-2 text-xs">
                <li>• <span className="font-bold">الطلوع:</span> زيادة عدد أيام الحيض (تستقر بـ 3 مرات متتالية).</li>
                <li>• <span className="font-bold">النزول:</span> نقصان عدد أيام الحيض (تستقر بمرتين متتاليتين).</li>
                <li>• <span className="font-bold">الانتقال:</span> تغير وقت الحيض (تستقر بمرة واحدة فقط).</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "التوابع وعلامات الطهر",
    icon: <Sparkles className="w-6 h-6" />,
    color: "bg-violet-50",
    videoUrl: "https://j.top4top.io/m_3721o8ns54.mp4",
    content: (
      <div className="space-y-6 text-right" dir="rtl">
        <div className="bg-gradient-to-br from-violet-600 to-purple-400 p-5 rounded-2xl text-white shadow-lg">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            علامات الطهر اليقينية
          </h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <span className="font-bold block text-violet-200">1. القصة البيضاء:</span>
              <p className="text-xs mt-1 leading-relaxed">ماء أبيض رقيق يخرج من الرحم عند انقطاع الحيض، يشبه الجير المبلول أو القرطاس الأبيض. وهي أقوى علامات الطهر وأوضحها.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl border border-white/20">
              <span className="font-bold block text-violet-200">2. الجفاف (الجفوف):</span>
              <p className="text-xs mt-1 leading-relaxed">أن يخرج المنديل (العلم) جافاً تماماً ليس عليه أثر من دم أو كدرة أو صفرة. وتعتبر طهراً لمن لم تكن عادتها رؤية القصة البيضاء، أو من اعتادت الجفاف أولاً.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-violet-100 shadow-sm">
          <h4 className="font-bold text-violet-800 mb-4">أنواع التوابع الأربعة:</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="p-3 border border-violet-50 rounded-xl bg-violet-50/30">
              <span className="font-bold text-violet-700">الكدرة:</span> سائل لونه كدر (بني فاتح) كعكر الماء.
            </div>
            <div className="p-3 border border-violet-50 rounded-xl bg-violet-50/30">
              <span className="font-bold text-violet-700">الصفرة:</span> سائل لونه أصفر كالصديد أو كبول البعير.
            </div>
            <div className="p-3 border border-violet-50 rounded-xl bg-violet-50/30">
              <span className="font-bold text-violet-700">الترية:</span> غسالة الدم، وهي شيء يسير جداً من أثر الدم (خيط رقيق).
            </div>
            <div className="p-3 border border-violet-50 rounded-xl bg-violet-50/30">
              <span className="font-bold text-violet-700">العلقة:</span> دم متجسد (قطعة دم) تخرج في نهاية الحيض.
            </div>
          </div>
        </div>

        <div className="bg-amber-50 p-5 rounded-2xl border-2 border-amber-200">
          <h4 className="font-bold text-amber-900 mb-2">قاعدة هامة في التوابع:</h4>
          <p className="text-sm text-amber-800 leading-relaxed italic">
            "حكم التوابع حكم ما قبلها". فإذا سبقها دم فهي حيض وتنتظر لها المرأة. أما إذا رأتها المرأة بعد طهر يقين (قصة أو جفاف) فلا تلتفت إليها وتعتبرها طهراً، ولا تنقض غسلها.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "الاستحاضة وكيفية الغسل",
    icon: <Info className="w-6 h-6" />,
    color: "bg-cyan-50",
    videoUrl: "https://k.top4top.io/m_3721pa2q25.mp4",
    content: (
      <div className="space-y-6 text-right" dir="rtl">
        <div className="bg-gradient-to-br from-cyan-600 to-sky-400 p-5 rounded-2xl text-white shadow-md">
          <h3 className="font-bold mb-3">الاستحاضة (دم العلة والفساد)</h3>
          <p className="text-sm leading-relaxed">
            هو دم يخرج من عرق يسمى (العاذل) في أدنى الرحم، في غير أوقات الحيض (أقل من 3 أيام أو أكثر من 10 أيام). 
            <br />
            <span className="font-bold underline">الأحكام الشرعية:</span> لا يمنع الصلاة ولا الصيام. يجب على المستحاضة الوضوء لكل صلاة بعد دخول وقتها، وغسل الموضع والتحفظ بقطنة.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-cyan-100">
          <h4 className="font-bold text-cyan-800 mb-4">كيفية الغسل من الحيض (بالتفصيل):</h4>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">1</div>
              <div>
                <span className="font-bold text-slate-800 block">النية:</span>
                <p className="text-xs text-gray-600">استحضار نية رفع الحدث الأكبر (الحيض) في القلب تقرباً لله.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">2</div>
              <div>
                <span className="font-bold text-slate-800 block">غسل الموضع:</span>
                <p className="text-xs text-gray-600">غسل الفرج جيداً وإزالة أي أثر للدم أو النجاسة.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">3</div>
              <div>
                <span className="font-bold text-slate-800 block">الوضوء:</span>
                <p className="text-xs text-gray-600">الوضوء الكامل كوضوء الصلاة (المضمضة، الاستنشاق، غسل الوجه واليدين).</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">4</div>
              <div>
                <span className="font-bold text-slate-800 block">غسل الرأس:</span>
                <p className="text-xs text-gray-600">صب الماء على الرأس ثلاثاً حتى يصل لأصول الشعر. <span className="font-bold">تنبيه:</span> يجب فك الضفائر في غسل الحيض لضمان وصول الماء للبشرة.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center font-bold shrink-0">5</div>
              <div>
                <span className="font-bold text-slate-800 block">تعميم الجسد:</span>
                <p className="text-xs text-gray-600">غسل الشق الأيمن ثم الأيسر، ثم إفاضة الماء على سائر الجسد مع التأكد من وصوله لكل ثنية (السرة، الإبطين، خلف الركبتين).</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-cyan-50 p-4 rounded-xl border border-cyan-200 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-600" />
          <p className="text-xs text-cyan-900 font-bold italic">
            يستحب تتبع أثر الدم بقطنة ممسكة (بها مسك) بعد الغسل لتطييب الموضع وإزالة الرائحة الكريهة.
          </p>
        </div>
      </div>
    )
  }
];


const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "بدأ الدم عند فاطمة يوم السبت الساعة 10 صباحاً، وانقطع تماماً يوم الثلاثاء الساعة 9 صباحاً. هل يعتبر هذا الدم حيضاً؟",
    options: [
      "نعم، لأنه استمر 3 أيام",
      "لا، لأنه لم يكمل 72 ساعة (نقص ساعة واحدة)",
      "نعم، لأن العبرة بالأيام وليس الساعات",
      "لا، لأن أقل الحيض 5 أيام"
    ],
    correctAnswer: 1,
    explanation: "أقل الحيض 72 ساعة كاملة. من السبت 10ص إلى الثلاثاء 10ص هي 72 ساعة. بما أنه انقطع 9ص فقد نقص ساعة، لذا يعتبر استحاضة ويجب قضاء الصلوات."
  },
  {
    id: 2,
    text: "رأت عائشة القصة البيضاء في اليوم السابع، ثم رأت كدرة (سائل بني) في اليوم الثامن. ما الحكم؟",
    options: [
      "تعتبر حائضاً وتنتظر يوماً وليلة",
      "تغتسل مرة أخرى",
      "لا تلتفت إليها وتعتبر طاهرة لأنها رأت الطهر اليقيني",
      "تنتظر يومين"
    ],
    correctAnswer: 2,
    explanation: "القاعدة تقول: 'التوابع بعد الطهر اليقيني لا تعتبر حيضاً'. بما أنها رأت القصة البيضاء (طهر يقين) فإن الكدرة بعدها لا تضر."
  },
  {
    id: 3,
    text: "امرأة عادتها 7 أيام، انقطع دمها في اليوم الخامس تماماً. ماذا تفعل؟",
    options: [
      "تغتسل وتصلي فوراً",
      "تنتظر يومين (48 ساعة) استبراءً للرحم ما لم يتجاوز 10 أيام",
      "تنتظر حتى اليوم السابع",
      "تنتظر يوماً وليلة"
    ],
    correctAnswer: 1,
    explanation: "المعتادة إذا طهرت قبل تمام عادتها يجب عليها 'انتظار الدم' لمدة يومين (48 ساعة) للتأكد من انقطاعه تماماً."
  },
  {
    id: 4,
    text: "ما هو الحكم إذا استمر الدم عند المرأة لمدة 11 يوماً متواصلة؟",
    options: [
      "كلها حيض",
      "أول 10 أيام حيض واليوم الحادي عشر استحاضة",
      "تعتبر كلها استحاضة",
      "تنتظر حتى اليوم الثاني عشر"
    ],
    correctAnswer: 1,
    explanation: "أكثر الحيض 10 أيام (240 ساعة). ما زاد عن ذلك فهو استحاضة (دم علة) لا تترك له الصلاة."
  },
  {
    id: 5,
    text: "رأت طالبة دماً وهي في سن الثامنة ونصف. هل يعتبر هذا الدم حيضاً؟",
    options: [
      "نعم، إذا كان بصفات الحيض",
      "لا، لأن أقل سن للحيض هو تمام التاسعة هجرية",
      "نعم، لأن البلوغ ليس له سن محدد",
      "لا، إلا إذا استمر 10 أيام"
    ],
    correctAnswer: 1,
    explanation: "أقل سن للحيض هو تمام السنة التاسعة هجرية. أي دم قبل ذلك يعتبر دم علة أو فساد وليس حيضاً."
  },
  {
    id: 6,
    text: "إذا رأت المرأة 'الصفرة' (سائل أصفر) متصلة بدم الحيض في اليوم السادس، فماذا تفعل؟",
    options: [
      "تغتسل وتصلي",
      "تنتظر يوماً وليلة (24 ساعة) لأنها من التوابع",
      "لا تنتظر شيئاً",
      "تنتظر يومين"
    ],
    correctAnswer: 1,
    explanation: "التوابع (كدرة، صفرة، ترية) إذا أعقبت الدم مباشرة تنتظر لها المرأة يوماً وليلة (24 ساعة) استبراءً."
  },
  {
    id: 7,
    text: "ما هي الوضعية الصحيحة للتفتيش (التحقق من الطهر)؟",
    options: [
      "الاستلقاء على الظهر",
      "القيام والقعود (كهيئة الراكعة) والمسح عرضاً",
      "المسح طولاً في أي وضعية",
      "لا توجد وضعية محددة"
    ],
    correctAnswer: 1,
    explanation: "الوضعية الصحيحة هي القيام والقعود لضمان خروج ما في الرحم، والمسح يكون عرضاً بالمنديل."
  },
  {
    id: 8,
    text: "هل يجب على الحائض قضاء الصلاة التي فاتتها أثناء الحيض؟",
    options: [
      "نعم، يجب قضاء كل الصلوات",
      "لا، لا تقضي الصلاة ولكن تقضي الصيام الواجب",
      "تقضي صلاة الفجر فقط",
      "نعم، إذا كانت المدة أقل من 5 أيام"
    ],
    correctAnswer: 1,
    explanation: "الحائض تسقط عنها الصلاة رحمة من الله ولا تقضيها، ولكن يجب عليها قضاء الصيام الواجب (رمضان)."
  },
  {
    id: 9,
    text: "استقرت عادة هند على 6 أيام لمدة 3 أشهر، وفي الشهر الرابع طهرت في 5 أيام. هل تغيرت عادتها؟",
    options: [
      "نعم، فوراً",
      "لا، النزول (نقصان الأيام) يحتاج تكرار مرتين لتستقر العادة الجديدة",
      "نعم، لأن النزول يستقر بمرة واحدة",
      "لا، العادة لا تتغير أبداً"
    ],
    correctAnswer: 1,
    explanation: "قاعدة تغير العادة: الطلوع (الزيادة) بـ 3 مرات، والنزول (النقصان) بمرتين، والانتقال (تغير الوقت) بمرة واحدة."
  },
  {
    id: 10,
    text: "ماذا تفعل المستحاضة (من بها دم علة) لكي تصلي؟",
    options: [
      "تنتظر حتى ينقطع الدم تماماً",
      "تغتسل لكل صلاة",
      "تتوضأ لكل صلاة بعد دخول وقتها وتتحفظ",
      "لا تصلي حتى تطهر"
    ],
    correctAnswer: 2,
    explanation: "المستحاضة حكمها حكم الطاهرات؛ تتوضأ لكل صلاة بعد دخول الوقت وتصلي وتصوم بشكل طبيعي."
  },
  {
    id: 11,
    text: "إذا طهرت الحائض قبل الفجر بمقدار ركعة واحدة، فماذا يجب عليها؟",
    options: [
      "صلاة الفجر فقط",
      "صلاة المغرب والعشاء (جمع تأخير)",
      "لا يجب عليها شيء",
      "صلاة العشاء فقط"
    ],
    correctAnswer: 1,
    explanation: "إذا طهرت المرأة قبل خروج وقت الصلاة بمقدار ركعة وجب عليها أداء تلك الصلاة وما يجمع إليها (كالمغرب مع العشاء)."
  },
  {
    id: 12,
    text: "أي من هذه الصفات ليست من صفات دم الحيض؟",
    options: [
      "اللون الأسود أو الأحمر القاني",
      "الرائحة الكريهة",
      "التجمد السريع كدم الجروح",
      "الثخانة والغلظة"
    ],
    correctAnswer: 2,
    explanation: "دم الحيض يتميز بأنه لا يتجمد (لا يتجلط) بخلاف دم الجروح العادي."
  },
  {
    id: 13,
    text: "ما هو 'العاذل'؟",
    options: [
      "اسم من أسماء الحيض",
      "العرق الذي يخرج منه دم الاستحاضة",
      "علامة من علامات الطهر",
      "نوع من أنواع التوابع"
    ],
    correctAnswer: 1,
    explanation: "الاستحاضة تخرج من عرق يسمى 'العاذل' في أدنى الرحم، بينما الحيض يخرج من قعر الرحم."
  },
  {
    id: 14,
    text: "امرأة رأت الجفاف التام في اليوم العاشر، هل تنتظر شيئاً؟",
    options: [
      "نعم، تنتظر يومين",
      "لا، تغتسل وتصلي فوراً لأنها وصلت لأكثر الحيض",
      "تنتظر يوماً وليلة",
      "تنتظر حتى اليوم الحادي عشر"
    ],
    correctAnswer: 1,
    explanation: "بما أنها وصلت لليوم العاشر (أقصى مدة للحيض) فإنها تغتسل وتصلي فور انقطاع الدم ولا تنتظر استبراءً."
  },
  {
    id: 15,
    text: "ما حكم مس المصحف للحائض؟",
    options: [
      "جائز مطلقاً",
      "محرم، ولكن يجوز القراءة من الحفظ أو الهاتف دون مس المصحف الورقي",
      "جائز إذا لبست قفازات",
      "محرم القراءة حتى من الحفظ"
    ],
    correctAnswer: 1,
    explanation: "يحرم على الحائض مس المصحف الورقي مباشرة، ولكن يجوز لها القراءة من حفظها أو من الهاتف عند الحاجة."
  },
  {
    id: 16,
    text: "بدأ الحيض عند ليلى يوم الخميس 4 عصراً، متى ينتهي اليوم الأول؟",
    options: [
      "فجر الجمعة",
      "الجمعة الساعة 4 عصراً",
      "الجمعة الساعة 12 ليلاً",
      "صباح السبت"
    ],
    correctAnswer: 1,
    explanation: "اليوم في حساب الحيض هو 24 ساعة كاملة من وقت بدء نزول الدم."
  },
  {
    id: 17,
    text: "رأت فتاة 'الترية' بعد اغتسالها من الحيض بيومين. ما الحكم؟",
    options: [
      "تعتبر حائضاً وتعود للانتظار",
      "لا تلتفت إليها وتعتبر طاهرة",
      "تغتسل مرة أخرى وجوباً",
      "تصلي بدون وضوء"
    ],
    correctAnswer: 1,
    explanation: "التوابع بعد الطهر اليقيني (الاغتسال برؤية علامة الطهر) لا تعتبر حيضاً ولا تنقض الطهر."
  },
  {
    id: 18,
    text: "ماذا يقصد بـ 'القصة البيضاء'؟",
    options: [
      "قصة تعليمية عن الحيض",
      "سائل أبيض رقيق يخرج من الرحم علامة على الطهر",
      "نوع من أنواع القماش المستخدم للتفتيش",
      "دم لونه أبيض"
    ],
    correctAnswer: 1,
    explanation: "القصة البيضاء هي سائل أبيض يدفعه الرحم عند انقطاع الدم، وهي أوضح علامات الطهر."
  },
  {
    id: 19,
    text: "هل يجوز للحائض دخول المسجد للمكث والجلوس؟",
    options: [
      "نعم، إذا كانت طاهرة الثياب",
      "لا يجوز، ويجوز لها العبور فقط (عند الضرورة)",
      "جائز في صلاة العيد فقط",
      "جائز إذا كانت تلبس حفاظة"
    ],
    correctAnswer: 1,
    explanation: "يحرم على الحائض المكث في المسجد، لقوله صلى الله عليه وسلم: 'لا أحل المسجد لحائض ولا جنب'."
  },
  {
    id: 20,
    text: "لماذا يجب فك الضفائر في غسل الحيض؟",
    options: [
      "لأنه زينة ولا تجوز في الغسل",
      "لضمان وصول الماء إلى أصول الشعر وفروة الرأس تماماً",
      "لأنه من السنن المهجورة",
      "لا يجب فكها بل يكفي المسح عليها"
    ],
    correctAnswer: 1,
    explanation: "في غسل الحيض يجب التأكد من وصول الماء لكل جزء من الجسد، وفك الضفائر يضمن وصول الماء لمنابت الشعر."
  }
];

// --- Components ---

const SallyCharacter = ({ message, size = "md", customImage, isSpeaking = false }: { message?: string, size?: "sm" | "md", customImage?: string, isSpeaking?: boolean }) => (
  <div className={`relative flex flex-col items-center ${size === "sm" ? "scale-75" : ""}`}>
    <motion.div 
      animate={{ 
        y: [0, -5, 0],
        rotate: isSpeaking ? [0, -1, 1, -1, 0] : 0
      }}
      transition={{ 
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: 0.5, repeat: isSpeaking ? Infinity : 0, ease: "linear" }
      }}
      className={`${size === "sm" ? "w-16 h-16" : "w-28 h-28"} bg-gradient-to-br from-orange-100 to-rose-100 rounded-full border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative`}
    >
      <img 
        src={customImage || "https://k.top4top.io/p_37220ax9i1.jpeg"} 
        alt="سالي" 
        className="w-full h-full object-cover scale-[1.2] object-center"
        referrerPolicy="no-referrer"
      />
      {/* Blinking effect */}
      <motion.div 
        animate={{ scaleY: [0, 0, 1, 0, 0] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1] }}
        className="absolute top-[35%] left-0 w-full h-[10%] bg-[#3d2b1f] origin-top opacity-20"
      />
    </motion.div>
    {message && size === "md" && (
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mt-3 bg-white p-3 rounded-2xl shadow-lg border border-rose-50 max-w-[200px] text-center relative"
      >
        <p className="text-slate-700 text-xs font-bold leading-relaxed">{message}</p>
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-l border-t border-rose-50"></div>
      </motion.div>
    )}
  </div>
);

const SallyChat = ({ onBack }: { onBack: () => void }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'أهلاً بكِ صديقتي! أنا سالي، يسعدني جداً الإجابة على استفساراتكِ حول "قصر الطهر" وأحكام الحيض بكل خصوصية وود.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `أنتِ "سالي"، شخصية عمانية ودودة ومثقفة. مهمتكِ هي مساعدة الفتيات (في سن 14-15 عاماً) وأمهاتهن على فهم أحكام الحيض بأسلوب عصري، أنيق، ومبسط. 
          - استخدمي المعلومات الموجودة في التطبيق (تعريف الحيض، مدته من 3 إلى 10 أيام، علامات الطهر كالقصة البيضاء والجفاف، أحكام الاستبراء والانتظار).
          - نبرة صوتكِ يجب أن تكون أخوية، داعمة، ومحترمة جداً.
          - إذا كان السؤال طبياً بحتاً أو خارج نطاق أحكام الحيض الشرعية، انصحي بلطف باستشارة الطبيبة أو الأم أو معلمة التربية الإسلامية.
          - حافظي على إجاباتكِ مختصرة ومفيدة وباللغة العربية الفصحى البسيطة أو اللهجة العمانية البيضاء المهذبة.
          - لا تذكري أنكِ ذكاء اصطناعي، بل أنتِ سالي رفيقتهم في قصر الطهر.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'model', text: response.text || 'عذراً صديقتي، لم أستطع فهم ذلك جيداً. هل يمكنكِ إعادة السؤال؟' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'عذراً، يبدو أن هناك مشكلة في الاتصال. حاولي مرة أخرى لاحقاً!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-[70vh] bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden"
    >
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <SallyCharacter size="sm" isSpeaking={isLoading} />
          <div>
            <h3 className="font-bold text-sm">اسألي سالي</h3>
            <p className="text-[10px] opacity-80">متصلة الآن للمساعدة</p>
          </div>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-colors">
          <Home className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-rose-50/30">
        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: msg.role === 'user' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tl-none' 
                : 'bg-white text-slate-700 border border-rose-100 rounded-tr-none'
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-white p-3 rounded-2xl shadow-sm flex gap-1">
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
              <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-rose-400 rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-rose-100 flex gap-2">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="اكتبي سؤالكِ هنا..."
          className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-2 text-sm focus:border-rose-300 outline-none transition-all"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading}
          className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [schoolId, setSchoolId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [detectedName, setDetectedName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'window' | 'quiz' | 'result' | 'chat' | 'videos'>('home');
  const [activeWindow, setActiveWindow] = useState<WindowContent | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const [sallyMessage, setSallyMessage] = useState('أنا سالي أهلاً بكِ صديقتي! أدخلي رقمك المدرسي لنبدأ رحلتنا التعليمية معاً.');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const name = STUDENTS[schoolId.trim()];
    if (name) {
      setStudentName(name);
      setIsLoggedIn(true);
      setSallyMessage(`مرحباً بكِ يا ${name.split(' ')[0]}! لدينا 5 نوافذ تعليمية ومسابقة شيقة بانتظاركِ أنتِ ووالدتكِ.`);
      setLoginError(false);
    } else {
      setSallyMessage('عذراً صديقتي، الرقم المدرسي غير صحيح. تأكدي من الرقم وحاولي مرة أخرى.');
      setLoginError(true);
    }
  };

  const handleWindowOpen = (window: WindowContent) => {
    setActiveWindow(window);
    setCurrentView('window');
    setSallyMessage(`رائع! شاهدي الفيديو واقرئي المعلومات في النافذة ${window.id}.`);
  };

  const handleQuizStart = () => {
    setQuizStep(0);
    setScore(0);
    setUserAnswers([]);
    setCurrentView('quiz');
    setSallyMessage('هيا بنا! استعيني بوالدتكِ لحل هذه الأسئلة الذكية.');
  };

  const handleAnswer = (answerIndex: number) => {
    const isCorrect = answerIndex === QUESTIONS[quizStep].correctAnswer;
    if (isCorrect) setScore(s => s + 1);
    setUserAnswers([...userAnswers, answerIndex]);
    
    if (quizStep < QUESTIONS.length - 1) {
      setQuizStep(s => s + 1);
      // Update sally message occasionally during quiz
      if ((quizStep + 1) % 5 === 0) {
        setSallyMessage('أنتِ تبدعين! استمري في التركيز.');
      }
    } else {
      setCurrentView('result');
      setSallyMessage('مبارك لكِ! لقد أتممتِ الرحلة بنجاح.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-indigo-50 flex items-center justify-center p-4 font-sans" dir="rtl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-md w-full max-w-md p-8 rounded-3xl shadow-2xl border border-white/50 text-center"
        >
          <SallyCharacter message={sallyMessage} />
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-indigo-600 mt-8 mb-2">نوافذ قرائية</h1>
          <p className="text-slate-500 font-medium mb-8">في أحكام الحيض - للصف الثامن</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-rose-500 transition-colors" />
              <input 
                type="text" 
                placeholder="الرقم المدرسي" 
                value={schoolId}
                onChange={(e) => {
                  const val = e.target.value;
                  setSchoolId(val);
                  if (loginError) setLoginError(false);
                  
                  // Auto-detect name
                  const name = STUDENTS[val.trim()];
                  if (name) {
                    setDetectedName(name);
                  } else {
                    setDetectedName('');
                  }
                }}
                className={`w-full bg-white border-2 rounded-2xl py-4 pr-12 pl-4 outline-none transition-all text-lg font-bold text-slate-700 ${
                  loginError ? 'border-rose-300 ring-4 ring-rose-50' : 'border-slate-100 focus:ring-4 focus:ring-rose-100 focus:border-rose-400'
                }`}
                required
              />
            </div>

            <AnimatePresence>
              {detectedName && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-3 text-right"
                  dir="rtl"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-emerald-600 font-bold">مرحباً بكِ صديقتي</p>
                    <p className="text-sm font-black text-emerald-800">{detectedName}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-200 hover:shadow-rose-300 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2"
            >
              دخول الرحلة التعليمية <ChevronLeft className="w-6 h-6" />
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffcf9] font-sans text-slate-900" dir="rtl">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-20 px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-800">نوافذ قرائية</h1>
            <p className="text-[10px] text-slate-500">أحكام الحيض</p>
          </div>
        </div>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-2xl mx-auto p-4 pb-24">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center py-4">
                <SallyCharacter message={sallyMessage} />
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => setCurrentView('chat')}
                    className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-3 rounded-2xl text-white font-bold text-sm shadow-lg shadow-rose-100 hover:shadow-rose-200 transition-all transform hover:-translate-y-1"
                  >
                    <MessageSquare className="w-5 h-5" />
                    اسألي سالي (ذكاء اصطناعي)
                  </button>
                  <button
                    onClick={() => setCurrentView('videos')}
                    className="flex items-center gap-2 bg-white border-2 border-rose-100 px-6 py-3 rounded-2xl text-rose-600 font-bold text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
                  >
                    <Camera className="w-5 h-5" />
                    مكتبة الفيديوهات
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                {WINDOWS.map((win) => (
                  <button
                    key={win.id}
                    onClick={() => handleWindowOpen(win)}
                    className={`${win.color} p-6 rounded-3xl border border-white/50 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 transition-all flex items-center justify-between group transform hover:-translate-y-1`}
                  >
                    <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform">
                      {win.icon}
                    </div>
                      <div className="text-right">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">النافذة {win.id}</span>
                        <h3 className="font-black text-lg text-slate-800">{win.title}</h3>
                      </div>
                    </div>
                    <div className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
                      <ChevronLeft className="w-6 h-6 text-slate-400 group-hover:text-slate-800 transition-all" />
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleQuizStart}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <h3 className="font-bold text-lg">المسابقة التفاعلية</h3>
                    <p className="text-xs text-indigo-100">20 سؤالاً من واقع الحياة (شاركي والدتكِ الحل)</p>
                  </div>
                </div>
                <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-all">
                  <ChevronLeft className="w-6 h-6" />
                </div>
              </button>
            </motion.div>
          )}

          {currentView === 'window' && activeWindow && (
            <motion.div 
              key="window"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#fffefc] rounded-3xl shadow-xl overflow-hidden border border-orange-50"
            >
              <div className={`${activeWindow.color} p-4 flex items-center justify-between`}>
                <SallyCharacter size="sm" />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm mb-1">
                    {activeWindow.icon}
                  </div>
                  <h2 className="font-black text-sm text-slate-800">{activeWindow.title}</h2>
                </div>
                <button 
                  onClick={() => setCurrentView('home')}
                  className="p-2 bg-white/50 hover:bg-white rounded-lg transition-colors"
                >
                  <Home className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              
              <div className="p-6 space-y-8">
                {activeWindow.videoUrl && (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-full max-w-[280px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white relative group">
                      <video 
                        src={activeWindow.videoUrl} 
                        controls 
                        className="w-full h-full object-cover"
                        poster={`https://picsum.photos/seed/window-${activeWindow.id}/400/700`}
                      />
                    </div>
                    <p className="text-xs font-bold text-slate-400">شاهدي الفيديو التعليمي أولاً</p>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute -top-4 right-0 bg-rose-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-sm z-10">
                    محتوى الدرس
                  </div>
                  <div className="pt-2">
                    {activeWindow.content}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => setCurrentView('home')}
                    className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-black py-4 px-12 rounded-2xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
                  >
                    إتمام النافذة والعودة <ChevronLeft className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'quiz' && (
            <motion.div 
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-xl flex items-center justify-between border border-orange-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <span className="font-black text-slate-700">سؤال {quizStep + 1} من {QUESTIONS.length}</span>
                </div>
                <div className="w-32 h-3 bg-slate-100/50 rounded-full overflow-hidden shadow-inner border border-slate-200/20">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500" 
                    style={{ width: `${((quizStep + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-[#fffefc] p-8 rounded-[2rem] shadow-2xl border border-orange-50/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full -mr-16 -mt-16"></div>
                <h2 className="text-xl font-black text-slate-800 mb-8 leading-relaxed relative z-10">
                  {QUESTIONS[quizStep].text}
                </h2>
                <div className="space-y-4 relative z-10">
                  {QUESTIONS[quizStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="w-full text-right p-5 rounded-2xl border-2 border-slate-100/50 bg-white/50 hover:border-indigo-400 hover:bg-indigo-50/50 hover:shadow-lg hover:shadow-indigo-100/50 transition-all font-bold text-slate-700 flex items-center justify-between group"
                    >
                      <span className="flex-1">{option}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-indigo-400 group-hover:bg-indigo-400 transition-all flex-shrink-0 mr-4"></div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-slate-400 text-sm font-medium italic">
                * يمكنكِ استشارة والدتكِ في الحل
              </div>
            </motion.div>
          )}

          {currentView === 'videos' && (
            <motion.div 
              key="videos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <Camera className="w-6 h-6 text-rose-500" />
                    مكتبة روابط الفيديوهات
                  </h2>
                  <button onClick={() => setCurrentView('home')} className="p-2 hover:bg-rose-50 rounded-full">
                    <Home className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
                
                <div className="space-y-4">
                  {WINDOWS.map((win) => (
                    <div key={win.id} className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          {win.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-800">{win.title}</h3>
                          <p className="text-[10px] text-slate-500">النافذة {win.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={win.videoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-rose-200 text-rose-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <Download className="w-4 h-4" />
                          رابط الفيديو
                        </a>
                        <button 
                          onClick={() => handleWindowOpen(win)}
                          className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-600 transition-all"
                        >
                          مشاهدة الآن
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'chat' && (
            <SallyChat onBack={() => setCurrentView('home')} />
          )}

          {currentView === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#fffefc] p-10 rounded-[2.5rem] shadow-2xl border border-orange-50 text-center relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-rose-500/5 blur-[100px] rounded-full"></div>
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/5 blur-[100px] rounded-full"></div>
              
              <SallyCharacter message={sallyMessage} />
              
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-8 shadow-inner">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <h2 className="text-3xl font-black text-slate-800 mb-2">أحسنتِ يا بطلة!</h2>
              <p className="text-slate-500 font-medium mb-10">لقد أتممتِ المسابقة بنجاح أنتِ ووالدتكِ.</p>
              
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 p-10 rounded-[2rem] mb-10 border border-white shadow-inner">
                <span className="text-sm font-bold text-slate-400 block mb-2 uppercase tracking-widest">نتيجتكِ النهائية</span>
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">{score} / {QUESTIONS.length}</span>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform hover:-translate-y-1"
                >
                  العودة للرئيسية
                </button>
                <button 
                  onClick={handleQuizStart}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-2xl transition-all"
                >
                  إعادة المسابقة
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation (Mobile Style) */}
      {isLoggedIn && currentView !== 'quiz' && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 flex items-center justify-around z-10">
          <button 
            onClick={() => setCurrentView('home')}
            className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">الرئيسية</span>
          </button>
          <button 
            onClick={() => setCurrentView('chat')}
            className={`flex flex-col items-center gap-1 ${currentView === 'chat' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <MessageSquare className="w-6 h-6" />
            <span className="text-[10px] font-bold">اسألي سالي</span>
          </button>
          <button 
            onClick={() => setCurrentView('videos')}
            className={`flex flex-col items-center gap-1 ${currentView === 'videos' ? 'text-rose-600' : 'text-slate-400'}`}
          >
            <Camera className="w-6 h-6" />
            <span className="text-[10px] font-bold">الفيديوهات</span>
          </button>
          <button 
            onClick={() => setCurrentView('quiz')}
            className={`flex flex-col items-center gap-1 ${currentView === 'quiz' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <HelpCircle className="w-6 h-6" />
            <span className="text-[10px] font-bold">المسابقة</span>
          </button>
        </nav>
      )}
    </div>
  );
}
