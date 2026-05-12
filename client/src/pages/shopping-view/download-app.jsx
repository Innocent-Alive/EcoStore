import React from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, ShieldCheck, Zap, Globe, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/ecostore.apk";
    link.download = "ecostore.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-secondary" />,
      title: "Fast Performance",
      description: "Experience lightning-fast browsing and checkout on our optimized Android app.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: "Secure Shopping",
      description: "Your data and transactions are protected with industry-standard encryption.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-secondary" />,
      title: "Mobile Exclusive Deals",
      description: "Get access to special discounts and offers available only for app users.",
    },
    {
      icon: <Globe className="w-8 h-8 text-secondary" />,
      title: "Offline Access",
      description: "Browse your favorite products even when you're offline or on a weak connection.",
    },
  ];

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Hero Section */}
      <section className="py-20 px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          className="lg:w-1/2 text-center lg:text-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl lg:text-6xl font-bold font-elsie text-primary mb-6">
            EcoStore for Android
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl mx-auto lg:mx-0">
            Take the sustainable lifestyle with you wherever you go. Our Android app offers a seamless shopping experience designed for the modern eco-conscious individual.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              onClick={handleDownload}
              className="bg-primary hover:bg-secondary text-background px-8 py-6 rounded-xl text-lg flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="w-6 h-6" />
              Download APK
            </Button>
            <div className="flex items-center gap-2 text-primary font-semibold py-2">
              <PackageCheck className="w-5 h-5" />
              Version 1.2.0 (Stable)
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 italic">
            * Requires Android 8.0 or higher.
          </p>
        </motion.div>

        <motion.div 
          className="lg:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-secondary/20 rounded-full blur-3xl"></div>
            <img 
              src="https://img.freepik.com/free-vector/app-development-concept-design_23-2148670124.jpg" 
              alt="Android App Mockup" 
              className="relative w-full max-w-md rounded-3xl shadow-2xl border-4 border-white"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white/50 backdrop-blur-sm px-6 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold font-elsie text-primary text-center mb-16">
            Why Choose Our App?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 bg-background rounded-2xl border border-secondary/20 shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4 inline-block p-3 bg-secondary/10 rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download Info */}
      <section className="py-20 px-6 lg:px-20 text-center">
        <div className="max-w-4xl mx-auto bg-primary text-background p-12 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <h2 className="text-3xl lg:text-4xl font-bold font-elsie mb-6 relative z-10">
            Ready to Start Your Eco-Journey?
          </h2>
          <p className="text-lg mb-10 opacity-90 relative z-10">
            Download the official EcoStore APK directly to your device and enjoy the best of sustainable shopping.
          </p>
          <Button 
            onClick={handleDownload}
            className="bg-secondary hover:bg-background hover:text-primary text-background px-10 py-7 rounded-2xl text-xl font-bold transition-all duration-300 relative z-10"
          >
            GET THE APP NOW
          </Button>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 relative z-10 opacity-80">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span>Virus Free</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>Direct Download</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Small Size (15MB)</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadApp;
