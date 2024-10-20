import React from "react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const TermsAndConditions = () => {
  return (
    <motion.div
      className="terms-container border-double border-4 my-5 mx-auto max-w-4xl p-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-4xl xs:text-3xl font-bold mb-10 text-primary text-center font-elsie">
        Terms and Conditions
      </h1>

      {/* Introduction */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Introduction
        </h2>
        <p className="text-gray-700">
          Welcome to EcoStore, your trusted destination for eco-friendly and
          biodegradable products. These Terms and Conditions govern your use of
          our website and services. By accessing or using our platform, you
          agree to be bound by these terms.
        </p>
      </section>

      {/* User Responsibilities */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          User Responsibilities
        </h2>
        <p className="text-gray-700">
          As a user of EcoStore, you agree to use the website in a lawful
          manner. You are prohibited from using our platform to engage in any
          fraudulent or harmful activity. You also agree to provide accurate
          information during the registration and purchase processes.
        </p>
      </section>

      {/* Account Registration */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Account Registration
        </h2>
        <p className="text-gray-700">
          To place an order, you may need to create an account with us. You are
          responsible for maintaining the confidentiality of your account
          details and ensuring that the information provided is current and
          accurate.
        </p>
      </section>

      {/* Payment Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Payment Terms
        </h2>
        <p className="text-gray-700">
          We accept various forms of payment, including credit/debit cards and
          online payment gateways. You agree to pay all applicable charges at
          the prices in effect when the charges are incurred, including shipping
          fees and applicable taxes. Failure to pay may result in the suspension
          or cancellation of your order.
        </p>
      </section>

      {/* Shipping and Delivery */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Shipping and Delivery
        </h2>
        <p className="text-gray-700">
          Shipping times may vary based on your location. While we strive to
          ensure prompt delivery of your orders, unforeseen delays may occur. We
          are not liable for any delays caused by third-party couriers.
        </p>
      </section>

      {/* Return and Refund Policy */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Return and Refund Policy
        </h2>
        <p className="text-gray-700">
          We accept returns within 30 days of purchase for most products,
          provided they are in their original condition and packaging. Refunds
          will be processed within 7-10 business days of receiving the returned
          product. Please refer to our detailed Return and Refund Policy for
          more information.
        </p>
      </section>

      {/* Intellectual Property */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Intellectual Property
        </h2>
        <p className="text-gray-700">
          All content on the EcoStore website, including product descriptions,
          images, and branding, is the property of EcoStore and is protected by
          intellectual property laws. You may not reproduce, distribute, or use
          any content from this website without prior written consent.
        </p>
      </section>

      {/* Limitation of Liability */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Limitation of Liability
        </h2>
        <p className="text-gray-700">
          EcoStore is not liable for any direct, indirect, incidental, or
          consequential damages that may arise from your use of the website or
          services. This includes, but is not limited to, damages resulting from
          lost data, unauthorized access, or interruptions in service.
        </p>
      </section>

      {/* Changes to Terms */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Changes to Terms
        </h2>
        <p className="text-gray-700">
          We reserve the right to modify or update these Terms and Conditions at
          any time. Any changes will be posted on this page, and your continued
          use of the website constitutes acceptance of the revised terms.
        </p>
      </section>

      {/* Contact Information */}
      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-secondary">
          Contact Information
        </h2>
        <p className="text-gray-700">
          If you have any questions regarding these Terms and Conditions, please
          contact us at:
        </p>
        <p className="text-gray-700">Email: support@ecostore.com</p>
        <p className="text-gray-700">Phone: +1 (800) 123-4567</p>
      </section>

      {/* Agreement */}
      <section className="mt-8">
        <p className="text-gray-700">
          By using this website, you acknowledge that you have read and agree to
          these Terms and Conditions.
        </p>
      </section>
    </motion.div>
  );
};

export default TermsAndConditions;
