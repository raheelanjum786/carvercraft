import React, { useState, useEffect } from "react";
import {
  Mail,
  Loader,
  Search,
  Send,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import api from "../../utils/axios";
import SideBar from "./SideBar";

const AdminSubscribedNewsletter = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [emailContent, setEmailContent] = useState({
    subject: "",
    body: "",
  });
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("subscribers");

  useEffect(() => {
    fetchSubscribers();
    fetchLogs();
  }, []);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const response = await api.get(
        "http://localhost:4000/api/newsletter/subscribers"
      );
      setSubscribers(response.data);
    } catch (error) {
      showNotification("Error fetching subscribers", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      const response = await api.get(
        "http://localhost:4000/api/newsletter/logs"
      );
      setLogs(response.data);
    } catch (error) {
      showNotification("Error fetching logs", error.message || error);
    }
  };

  // const handleSendEmail = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const response = await api.post(
  //       "http://localhost:4000/api/newsletter/send-newsletter",
  //       {
  //         emails: selectedEmails,
  //         subject: emailContent.subject,
  //         body: emailContent.body,
  //       },
  //       { headers: { "Content-Type": "application/json" } }
  //     );

  //     console.log("Response");
  //     showNotification("Newsletter sent successfully!");
  //     setShowEmailForm(false);
  //     setEmailContent({ subject: "", body: "" });
  //     setSelectedEmails([]);
  //     fetchLogs();
  //   } catch (error) {
  //     showNotification("Failed to send newsletter", error.message || error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchSubscribers();
  //   fetchLogs();
  // }, []);

  // const fetchSubscribers = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       "http://localhost:4000/api/newsletter/subscribers"
  //     );
  //     if (!response.ok) throw new Error("Failed to fetch subscribers");
  //     const data = await response.json();
  //     setSubscribers(data);
  //   } catch (error) {
  //     showNotification("Error fetching subscribers", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const fetchLogs = async () => {
  //   try {
  //     const response = await fetch("http://localhost:4000/api/newsletter/logs");
  //     if (!response.ok) throw new Error("Failed to fetch logs");
  //     const data = await response.json();
  //     setLogs(data);
  //   } catch (error) {
  //     showNotification("Error fetching logs", error);
  //   }
  // };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSelectAll = (e) => {
    setSelectedEmails(
      e.target.checked ? subscribers.map((sub) => sub.email) : []
    );
  };

  const handleSelect = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:4000/api/newsletter/send-newsletter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emails: selectedEmails,
            subject: emailContent.subject,
            body: emailContent.body,
          }),
        }
      );
      console.log("Response:", response.data);
      if (!response.ok) throw new Error("Failed to send newsletter");

      showNotification("Newsletter sent successfully!");
      setShowEmailForm(false);
      setEmailContent({ subject: "", body: "" });
      setSelectedEmails([]);
      fetchLogs();
    } catch (error) {
      showNotification("Failed to send newsletter", "error");
    } finally {
      setLoading(false);
    }
  };

  const filteredSubscribers = subscribers.filter((sub) =>
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex">
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isMobile={isMobile}
          setIsMobile={setIsMobile}
        />
      </div>
      <div
        className={`min-h-screen bg-gradient-to-br from-[#310A0B] to-[#491B1D] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {notification && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-lg flex items-center gap-2 ${
                notification.type === "error" ? "bg-red-600" : "bg-green-600"
              } text-white`}
            >
              {notification.type === "error" ? (
                <AlertCircle size={20} />
              ) : (
                <CheckCircle size={20} />
              )}
              {notification.message}
            </div>
          )}

          <div className="bg-[#491B1D] rounded-lg shadow-lg p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`px-4 py-2 rounded ${
                  activeTab === "subscribers"
                    ? "bg-[#743A36] text-[#E0A387]"
                    : "text-[#E0A387]"
                }`}
              >
                Subscribers
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 rounded ${
                  activeTab === "logs"
                    ? "bg-[#743A36] text-[#E0A387]"
                    : "text-[#E0A387]"
                }`}
              >
                Sending Logs
              </button>
            </div>

            {activeTab === "subscribers" ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-[#E0A387]">
                    Newsletter Subscribers
                  </h1>
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="flex items-center gap-2 bg-[#743A36] text-[#E0A387] px-4 py-2 rounded hover:bg-[#B96A59] transition-colors disabled:opacity-50"
                    disabled={selectedEmails.length === 0}
                  >
                    <Mail size={20} />
                    Send Newsletter
                  </button>
                </div>

                <div className="relative mb-4">
                  <input
                    type="text"
                    placeholder="Search subscribers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 bg-[#310A0B] text-[#E0A387] rounded border border-[#743A36] pl-10"
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-[#743A36]"
                    size={20}
                  />
                </div>

                {loading ? (
                  <div className="flex justify-center p-8">
                    <Loader className="animate-spin text-[#E0A387]" size={32} />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#743A36] text-[#E0A387]">
                        <tr>
                          <th className="px-4 py-2 text-left">
                            <input
                              type="checkbox"
                              onChange={handleSelectAll}
                              checked={
                                selectedEmails.length === subscribers.length
                              }
                            />
                          </th>
                          <th className="px-4 py-2 text-left">Email</th>
                          <th className="px-4 py-2 text-left">
                            Subscribed Date
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSubscribers.map((subscriber) => (
                          <tr
                            key={subscriber.email}
                            className="border-b border-[#743A36] text-[#E0A387]"
                          >
                            <td className="px-4 py-2">
                              <input
                                type="checkbox"
                                checked={selectedEmails.includes(
                                  subscriber.email
                                )}
                                onChange={() => handleSelect(subscriber.email)}
                              />
                            </td>
                            <td className="px-4 py-2">{subscriber.email}</td>
                            <td className="px-4 py-2">
                              {new Date(
                                subscriber.createdAt
                              ).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            ) : (
              <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold text-[#E0A387] mb-6">
                  Newsletter Logs
                </h1>
                <table className="w-full">
                  <thead className="bg-[#743A36] text-[#E0A387]">
                    <tr>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Recipients</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-b border-[#743A36] text-[#E0A387]"
                      >
                        <td className="px-4 py-2">
                          {new Date(log.sentAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">{log.subject}</td>
                        <td className="px-4 py-2">{log.recipientCount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {showEmailForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-[#491B1D] rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-[#E0A387]">
                  Compose Newsletter
                </h2>
                <form onSubmit={handleSendEmail}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Subject"
                      value={emailContent.subject}
                      onChange={(e) =>
                        setEmailContent({
                          ...emailContent,
                          subject: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-[#310A0B] text-[#E0A387] rounded border border-[#743A36]"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      placeholder="Email content..."
                      value={emailContent.body}
                      onChange={(e) =>
                        setEmailContent({
                          ...emailContent,
                          body: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 bg-[#310A0B] text-[#E0A387] rounded border border-[#743A36] h-40"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="px-4 py-2 text-[#E0A387]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#743A36] text-[#E0A387] px-4 py-2 rounded hover:bg-[#B96A59] transition-colors"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className="animate-spin" size={20} />
                      ) : (
                        <Send size={20} />
                      )}
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSubscribedNewsletter;
