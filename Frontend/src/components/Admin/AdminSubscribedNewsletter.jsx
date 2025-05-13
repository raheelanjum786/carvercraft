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
      const response = await api.post(
        "http://localhost:4000/api/newsletter/send-newsletter",
        {
          emails: selectedEmails,
          subject: emailContent.subject,
          body: emailContent.body,
        }
      );

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
        className={`min-h-screen bg-[#1A1A1A] p-6 flex-1 ${
          isMobile ? "" : isOpen ? "ml-[256px]" : "ml-[84px]"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {notification && (
            <div
              className={`fixed top-4 right-4 p-4 rounded-lg flex items-center gap-2 ${
                notification.type === "error" ? "bg-[#E74C3C]" : "bg-[#2ECC71]"
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

          <div className="bg-[#2D2D2D] rounded-lg shadow-lg p-6">
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setActiveTab("subscribers")}
                className={`px-4 py-2 rounded ${
                  activeTab === "subscribers"
                    ? "bg-[#2C3E50] text-white"
                    : "text-[#ECF0F1]"
                }`}
              >
                Subscribers
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-4 py-2 rounded ${
                  activeTab === "logs"
                    ? "bg-[#2C3E50] text-white"
                    : "text-[#ECF0F1]"
                }`}
              >
                Sending Logs
              </button>
            </div>

            {activeTab === "subscribers" ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-white">
                    Newsletter Subscribers
                  </h1>
                  <button
                    onClick={() => setShowEmailForm(true)}
                    className="flex items-center gap-2 bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2980B9] transition-colors disabled:opacity-50"
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
                    className="w-full px-4 py-2 bg-[#1A1A1A] text-white rounded border border-[#34495E] pl-10"
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-[#34495E]"
                    size={20}
                  />
                </div>

                {loading ? (
                  <div className="flex justify-center p-8">
                    <Loader className="animate-spin text-[#3498DB]" size={32} />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#2C3E50] text-white">
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
                            className="border-b border-[#34495E] text-[#ECF0F1]"
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
                <h1 className="text-2xl font-bold text-white mb-6">
                  Newsletter Logs
                </h1>
                <table className="w-full">
                  <thead className="bg-[#2C3E50] text-white">
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
                        className="border-b border-[#34495E] text-[#ECF0F1]"
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
              <div className="bg-[#2D2D2D] rounded-lg p-6 w-full max-w-2xl">
                <h2 className="text-xl font-bold mb-4 text-white">
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
                      className="w-full px-4 py-2 bg-[#1A1A1A] text-white rounded border border-[#34495E]"
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
                      className="w-full px-4 py-2 bg-[#1A1A1A] text-white rounded border border-[#34495E] h-40"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEmailForm(false)}
                      className="px-4 py-2 text-[#ECF0F1]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#3498DB] text-white px-4 py-2 rounded hover:bg-[#2980B9] transition-colors"
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
