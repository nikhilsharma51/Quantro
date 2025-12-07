import React, { useEffect, useState } from 'react'
import { FiHome, FiBarChart2, FiCalendar, FiEdit3, FiPlusSquare , FiSettings } from 'react-icons/fi'
import { isCookie, useNavigate } from 'react-router-dom'

const rupee = (v) => `₹${v}`

const Sidebar = () => {
  const navigate = useNavigate();


  const [collapsed, setCollapsed] = useState(() => {
    try {
      const raw = localStorage.getItem('sidebarCollapsed')
      return raw === 'true'
    } catch (e) {
      return false
    }
  })

  const [selectedAccount, setSelectedAccount] = useState('') // initially empty
  const [balance, setBalance] = useState('') // value field initially blank
  const [activeCash] = useState(0)
  const [totalCash] = useState(0)

  useEffect(() => {
    try {
      localStorage.setItem('sidebarCollapsed', collapsed ? 'true' : 'false')
    } catch (e) {}
  }, [collapsed])

  return (
    <aside
      className={`h-screen bg-[#0f1624] text-gray-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-20' : 'w-64'}`}
      aria-label="Main navigation"
    >
      {/* Header: Brand + toggle */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold">Q</div>
          {!collapsed && <span className="text-lg font-semibold">Quantro</span>}
        </div>

        <button
          aria-expanded={!collapsed}
          aria-controls="sidebar-nav"
          onClick={() => setCollapsed((s) => !s)}
          className="p-2 rounded hover:bg-white/6 focus:outline-none"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={`w-5 h-5 transform ${collapsed ? '' : 'rotate-180'}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      {/* Account selector and balance input */}
      <div className="px-4">
        <label className="text-xs text-gray-400">Account</label>
        {/* initially empty select - nothing to choose from */}
        {!collapsed && <select
          value={selectedAccount}
          onChange={(e) => setSelectedAccount(e.target.value)}
          className="w-full mt-2 bg-transparent border border-gray-700 rounded px-3 py-2 text-sm"
          disabled
          aria-label="Select account"
        >
          <option value="">No accounts available</option>
        </select>}

        <div className="mt-4">
          <label className="text-xs text-gray-400">Value</label>
          {!collapsed && <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-2 text-gray-300">₹</div>
              <input
                type="number"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder=""
                className="w-full pl-8 pr-3 py-2 bg-transparent border border-gray-700 rounded text-white text-sm"
                aria-label="Account value in rupees"
              />
            </div>
            <button
              type="button"
              aria-label="Edit value"
              title="Edit value"
              className="p-2 rounded bg-white/5 hover:bg-white/8"
            >
              <FiEdit3 className="w-4 h-4" />
            </button>
          </div>}

          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white/2 p-3 rounded">
              <div className="text-xs text-gray-400">Active Cash</div>
              <div className="text-white font-medium mt-1">{rupee(activeCash)}</div>
            </div>
            <div className="bg-white/2 p-3 rounded">
              {!collapsed && <div className="text-xs text-gray-400">Total Cash</div>}
              {!collapsed && <div className="text-white font-medium mt-1">{rupee(totalCash)}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav id="sidebar-nav" className="mt-6 px-2 flex-1 overflow-auto" role="navigation" aria-label="Primary">
        <ul className="space-y-1">
          <li onClick={() =>{navigate('/dashboard')}}>
            <a
              href="/dashboard"
              className="flex items-center gap-3 rounded px-3 py-2 hover:bg-white/6"
              title="Dashboard"
            >
              <FiHome className="w-5 h-5 text-gray-200" />
              {!collapsed && <span className="text-sm font-medium">Dashboard</span>}
            </a>
          </li>

          <li onClick={() =>{navigate('/stats')}}>
            <a
              href="/stats"
              className="flex items-center gap-3 rounded px-3 py-2 hover:bg-white/6"
              title="Stats"
            >
              <FiBarChart2 className="w-5 h-5 text-gray-200" />
              {!collapsed && <span className="text-sm font-medium">Stats</span>}
            </a>
          </li>

          <li onClick={() =>{navigate('/calendar')}}>
            <a
              href="/calendar"
              className="flex items-center gap-3 rounded px-3 py-2 hover:bg-white/6"
              title="Calendar"
            >
              <FiCalendar className="w-5 h-5 text-gray-200" />
              {!collapsed && <span className="text-sm font-medium">Calendar</span>}
            </a>
          </li>
          <li onClick={() =>{navigate('/account')}}>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="flex items-center gap-3 rounded px-3 py-2 hover:bg-white/6"
              title="Account"
            >
              <FiSettings className="w-5 h-5 text-gray-200" />
              {!collapsed && <span className="text-sm font-medium">Account</span>}
            </a>
          </li>
        </ul>

        {/* CTA buttons */}
        <div className="mt-6 px-3">
          <div className="flex flex-col gap-3">
            <button
              className="w-full flex items-center gap-3 justify-center bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2 rounded"
              title="New Trade (NT)"
              type="button"
            >
              <FiPlusSquare className="w-4 h-4" />
              {!collapsed ? 'New Trade' : null}
            </button>

            <button
              className="w-full flex items-center gap-3 justify-center bg-white/5 hover:bg-white/8 text-white py-2 rounded"
              title="New Setup (NS)"
              type="button"
            >
              <FiPlusSquare className="w-4 h-4" />
              {!collapsed ? 'New Setup' : null}
            </button>

            <button
              className="w-full flex items-center gap-3 justify-center bg-white/5 hover:bg-white/8 text-white py-2 rounded"
              title="New Note (NN)"
              type="button"
            >
              <FiPlusSquare className="w-4 h-4" />
              {!collapsed ? 'New Note' : null}
            </button>
          </div>
        </div>
      </nav>

      {/* Footer support pill */}
      {!collapsed && <div className="px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <a href="#" className="text-sm bg-white/5 px-3 py-1 rounded-full hover:bg-white/8">Support this free platform</a>
          {!collapsed && <div className="text-xs text-gray-400">v1.0</div>}
        </div>
      </div>}
    </aside>
  )
}

export default Sidebar

