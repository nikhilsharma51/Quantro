import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Account = () => {
  const { user, setUser, logout } = useAuth()
  const [tab, setTab] = useState('personal')
  const [fullname, setFullname] = useState(user?.fullname || '')

  const handleSavePersonal = (e) => {
    e.preventDefault()
    // locally update user for now; integrate with API when available
    setUser((u) => ({ ...u, fullname }))
    // TODO: call API to persist change
  }

  const handleChangePassword = (e) => {
    e.preventDefault()
    // TODO: wire to backend change-password endpoint
    alert('Password change not implemented yet')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-[#0f1724] rounded shadow-lg overflow-hidden">
        <div className="md:flex">
          <aside className="w-full md:w-60 bg-[#0b1220] p-4 border-r border-white/5">
            <h3 className="text-white font-semibold mb-4">Settings</h3>
            <nav className="space-y-2">
              <button
                onClick={() => setTab('personal')}
                className={`w-full text-left px-3 py-2 rounded ${tab === 'personal' ? 'bg-white/6' : 'hover:bg-white/3'}`}
              >
                Personal Info
              </button>

              <button
                onClick={() => setTab('password')}
                className={`w-full text-left px-3 py-2 rounded ${tab === 'password' ? 'bg-white/6' : 'hover:bg-white/3'}`}
              >
                Password & Security
              </button>

              <div className="mt-4">
                <button
                  onClick={() => logout()}
                  className="w-full text-left px-3 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
                >
                  Logout
                </button>
              </div>
            </nav>
          </aside>

          <main className="flex-1 p-6">
            {tab === 'personal' && (
              <section>
                <h2 className="text-white text-lg font-semibold mb-4">Personal Info</h2>
                <form onSubmit={handleSavePersonal} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm text-gray-300">Full Name</label>
                    <input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="mt-1 w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-300">Email (read-only)</label>
                    <input
                      value={user?.email || ''}
                      readOnly
                      className="mt-1 w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-gray-400"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button type="submit" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded">Save</button>
                    <button type="button" onClick={() => { setFullname(user?.fullname || '') }} className="px-4 py-2 rounded border border-gray-700 text-gray-200">Cancel</button>
                  </div>
                </form>
              </section>
            )}

            {tab === 'password' && (
              <section>
                <h2 className="text-white text-lg font-semibold mb-4">Password & Security</h2>
                <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm text-gray-300">Current Password</label>
                    <input type="password" className="mt-1 w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">New Password</label>
                    <input type="password" className="mt-1 w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300">Confirm New Password</label>
                    <input type="password" className="mt-1 w-full bg-transparent border border-gray-700 rounded px-3 py-2 text-white" />
                  </div>
                  <div>
                    <button type="submit" className="bg-[#3b82f6] hover:bg-[#2563eb] text-white px-4 py-2 rounded">Change Password</button>
                  </div>
                </form>
              </section>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Account
