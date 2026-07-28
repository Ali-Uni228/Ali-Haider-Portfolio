'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Certificate = {
  id: string | number
  title: string
  image_url: string
}

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('certificates').select('*')
      setCertificates(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <>
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/90 backdrop-blur-md flex items-center justify-center px-6"
          >
            <button
              onClick={() => setPreviewOpen(false)}
              className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35 }}
              src={previewImage}
              className="max-w-[88vw] max-h-[88vh] rounded-3xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="certificates"
        className="w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-10 lg:px-20 pt-16 pb-16 text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: smoothEase }}
          style={{ marginBottom: 32 }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 12,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.2em',
            }}
          >
            CERTIFICATES
          </span>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              fontWeight: 800,
              marginTop: 10,
              color: '#fff',
            }}
          >
            Courses & Certifications
          </h2>
        </motion.div>

        {!loading && certificates.length === 0 && (
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            No certificates added yet — manage these from the admin panel.
          </p>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certificates.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setPreviewImage(item.image_url)
                setPreviewOpen(true)
              }}
              className="group cursor-pointer rounded-[26px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <div className="rounded-2xl overflow-hidden border border-white/10 h-56">
                <img
                  src={item.image_url}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <h3 className="mt-4 text-[15px] font-semibold text-center text-white/90">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
