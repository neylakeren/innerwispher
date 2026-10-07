import React, { useState } from 'react';
import { useCareer } from '../context/CareerContext';
import { INTERVIEW_QUESTIONS } from '../data/careerData';
import { Button } from '../components/ui';
import { 
  FileText, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function CareerCvInterview() {
  const { careerState, updateCareerState } = useCareer();

  // CV Checker State
  const [cvText, setCvText] = useState('');
  const [cvResult, setCvResult] = useState(null);

  // Interview Simulator State
  const [questionIdx, setQuestionIdx] = useState(0);
  const [interviewAnswer, setInterviewAnswer] = useState('');
  const [interviewFeedback, setInterviewFeedback] = useState(null);

  const handleCheckCV = () => {
    const text = cvText.trim();
    const words = text.split(/\s+/).filter(Boolean).length;

    const criteria = [
      {
        title: 'Mencantumkan email aktif',
        passed: /\S+@\S+\.\S+/.test(text),
        tip: 'Pastikan email profesional tercantum jelas di bagian header.'
      },
      {
        title: 'Mencantumkan nomor telepon / WhatsApp',
        passed: /(\+62|08)[\d\s-]{7,}/.test(text),
        tip: 'Tambahkan nomor kontak yang aktif dan mudah dihubungi.'
      },
      {
        title: 'Memiliki bagian riwayat pendidikan',
        passed: /pendidikan|education|universitas|jurusan|ipk/i.test(text),
        tip: 'Cantumkan universitas, jurusan, serta tahun kelulusan/angkatan.'
      },
      {
        title: 'Memiliki riwayat pengalaman kerja / organisasi / magang',
        passed: /pengalaman|magang|organisasi|experience|internship|project/i.test(text),
        tip: 'Sertakan kepanitiaan, magang, atau proyek nyata yang pernah kamu kerjakan.'
      },
      {
        title: 'Daftar keterampilan teknis & soft skills terurai',
        passed: /keterampilan|skill|keahlian|tools|kompetensi/i.test(text),
        tip: 'Rincikan tool spesifik seperti Excel, Figma, Git, atau bahasa pemrograman.'
      },
      {
        title: 'Menggunakan kata kerja tindakan aktif (Action Verbs)',
        passed: /memimpin|mengelola|membuat|merancang|menganalisis|mengembangkan|led |managed|built|designed/i.test(text),
        tip: 'Awali poin resume dengan kata kerja aktif seperti "Merancang...", "Mengembangkan...".'
      },
      {
        title: 'Terdapat dampak terukur / metrik kuantitatif (Angka/%)',
        passed: /\d+\s?(%|orang|proyek|anggota|project|rupiah|juta)/i.test(text),
        tip: 'Sertakan metrik konkret seperti "Meningkatkan engagement sebesar 25%" atau "Mengelola 10 orang".'
      },
      {
        title: 'Panjang ideal (120 – 600 kata)',
        passed: words >= 120 && words <= 600,
        tip: `Panjang teks saat ini: ${words} kata. Buat ringkas dan padat (ideal 1 halaman).`
      }
    ];

    const passedCount = criteria.filter(c => c.passed).length;
    const score = Math.round((passedCount / criteria.length) * 100);
    const isPassed = score >= 75;

    setCvResult({ score, criteria, words });
    updateCareerState({ cvScore: score, cvPassed: isPassed });
  };

  const handleCheckInterview = () => {
    const text = interviewAnswer.trim();
    const words = text.split(/\s+/).filter(Boolean).length;
    const feedbackList = [];

    if (words >= 40) {
      feedbackList.push({
        status: true,
        text: `Panjang jawaban optimal (${words} kata). Struktur penjelasanmu cukup mendalam.`
      });
    } else {
      feedbackList.push({
        status: false,
        text: `Jawaban terlalu singkat (${words} kata). Rekomendasi minimal 40 kata agar pewawancara memahami konteksmu.`
      });
    }

    if (/misalnya|contoh|ketika|saat itu|pernah|pengalaman|proyek/i.test(text)) {
      feedbackList.push({
        status: true,
        text: 'Bagus! Kamu menyertakan studi kasus atau contoh pengalaman konkret.'
      });
    } else {
      feedbackList.push({
        status: false,
        text: 'Kurang contoh nyata. Sisipkan frasa seperti "Sebagai contoh saat saya..." untuk memperkuat argumen.'
      });
    }

    if (/hasil|berhasil|meningkat|selesai|belajar|dampak|solusi/i.test(text)) {
      feedbackList.push({
        status: true,
        text: 'Penutup yang kuat! Kamu menekankan hasil akhir atau pelajaran berharga yang dipetik.'
      });
    } else {
      feedbackList.push({
        status: false,
        text: 'Tambahkan resolusi di akhir jawaban: apa hasil akhirnya atau apa hikmah yang kamu pelajari.'
      });
    }

    setInterviewFeedback(feedbackList);
  };

  const handleNextQuestion = () => {
    setQuestionIdx((questionIdx + 1) % INTERVIEW_QUESTIONS.length);
    setInterviewAnswer('');
    setInterviewFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-quicksand pb-12">
      {/* Header */}
      <div className="card-s p-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#efeafb] text-[#4b3b86] text-xs font-semibold mb-2">
          <FileText size={14} />
          Persiapan Kerja
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#2b2542] tracking-tight">
          CV Checker & Simulasi Wawancara
        </h1>
        <p className="text-sm text-[#5d5577] mt-1">
          Uji kesiapan teks resume-mu dengan standar industri dan latih respon wawancara kerja secara interaktif.
        </p>
      </div>

      {/* Bagian 1: CV Checker */}
      <div className="card-s p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#2b2542]">Pemeriksa Kualitas CV (ATS Audit)</h2>
            <p className="text-xs text-[#5d5577]">Tempel seluruh isi teks CV / Resume kamu ke dalam kolom di bawah.</p>
          </div>
        </div>

        <textarea
          rows={7}
          value={cvText}
          onChange={(e) => setCvText(e.target.value)}
          placeholder="Tempel teks CV-mu di sini (Summary, Pengalaman Kerja, Pendidikan, Organisasi, Keterampilan)..."
          className="w-full p-4 rounded-xl border border-[#d9cff5] bg-white text-sm text-[#2b2542] placeholder:text-[#8a82a2] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/20 transition-all"
        />

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <Button
            variant="primary"
            size="md"
            disabled={!cvText.trim()}
            onClick={handleCheckCV}
            className="w-full sm:w-auto"
          >
            Audit Isi CV Saya
          </Button>
          <span className="text-xs text-[#5d5577]">
            {cvText.trim().split(/\s+/).filter(Boolean).length} kata terdeteksi
          </span>
        </div>

        {/* Results */}
        {cvResult && (
          <div className="mt-6 pt-6 border-t border-[#d9cff5]/60 space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5]">
              <div>
                <span className="text-xs font-semibold text-[#5d5577]">Skor Kelayakan Resume</span>
                <div className="text-2xl font-bold text-[#4b3b86]">{cvResult.score} / 100</div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  cvResult.score >= 75 
                    ? 'bg-[#d1e7dd] text-[#198754]' 
                    : 'bg-[#fff3cd] text-[#664d03]'
                }`}>
                  {cvResult.score >= 75 ? 'Siap Kirim (Optimal)' : 'Perlu Perbaikan'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4b3b86]">
                Analisis Detail 8 Kriteria:
              </h3>
              <div className="grid grid-cols-1 gap-2.5">
                {cvResult.criteria.map((item, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-3 text-xs ${
                      item.passed 
                        ? 'bg-[#f8fdf9] border-[#d1e7dd] text-[#198754]' 
                        : 'bg-[#fffcfc] border-[#fce8e9] text-[#9b1c28]'
                    }`}
                  >
                    {item.passed ? (
                      <CheckCircle2 size={16} className="text-[#198754] shrink-0 mt-0.5" />
                    ) : (
                      <XCircle size={16} className="text-[#dc3545] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">{item.title}</p>
                      {!item.passed && (
                        <p className="text-[#5d5577] mt-0.5 text-[11px] font-normal">{item.tip}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bagian 2: Simulasi Wawancara */}
      <div className="card-s p-6 sm:p-8 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#efeafb] text-[#8f78d8] flex items-center justify-center">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#2b2542]">Simulasi Wawancara Kerja</h2>
              <p className="text-xs text-[#5d5577]">Latih kemampuan komunikasi dan struktur jawabanmu.</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextQuestion}
            className="flex items-center gap-1.5 text-xs"
          >
            <RotateCcw size={12} />
            Ganti Pertanyaan
          </Button>
        </div>

        {/* Current Question Box */}
        <div className="p-4 rounded-xl bg-[#efeafb]/70 border border-[#d9cff5]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#8f78d8]">
            Pertanyaan {questionIdx + 1} dari {INTERVIEW_QUESTIONS.length}
          </span>
          <p className="text-base sm:text-lg font-bold text-[#2b2542] mt-1">
            "{INTERVIEW_QUESTIONS[questionIdx]}"
          </p>
        </div>

        {/* Answer Box */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#5d5577] block">
            Ketik respon jawabanmu seperti sedang berbicara di sesi interview:
          </label>
          <textarea
            rows={4}
            value={interviewAnswer}
            onChange={(e) => setInterviewAnswer(e.target.value)}
            placeholder="Tulis jawabanmu di sini. Terapkan metode STAR (Situation, Task, Action, Result)..."
            className="w-full p-4 rounded-xl border border-[#d9cff5] bg-white text-sm text-[#2b2542] placeholder:text-[#8a82a2] focus:outline-none focus:border-[#8f78d8] focus:ring-2 focus:ring-[#8f78d8]/20 transition-all"
          />
        </div>

        <div className="flex justify-between items-center">
          <Button
            variant="primary"
            size="md"
            disabled={!interviewAnswer.trim()}
            onClick={handleCheckInterview}
          >
            Evaluasi Jawaban Saya
          </Button>
          <span className="text-xs text-[#5d5577]">
            {interviewAnswer.trim().split(/\s+/).filter(Boolean).length} kata
          </span>
        </div>

        {/* Interview Feedback */}
        {interviewFeedback && (
          <div className="mt-4 p-4 rounded-xl bg-white border border-[#d9cff5] space-y-2">
            <h4 className="text-xs font-bold text-[#4b3b86] uppercase tracking-wider">
              Umpan Balik Jawaban:
            </h4>
            <div className="space-y-2">
              {interviewFeedback.map((fb, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2b2542]">
                  {fb.status ? (
                    <CheckCircle2 size={15} className="text-[#198754] shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle size={15} className="text-[#dc3545] shrink-0 mt-0.5" />
                  )}
                  <span>{fb.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
