import React, { useState } from 'react';
import { Shield, AlertTriangle, Wifi, Globe, Server, Database, Lock, Camera, Microscope as Microphone, Video, Brush as Virus, Fingerprint, Webhook, Network, ShieldAlert, Radar, ChevronDown, Bug, Wifi as WifiIcon, Zap, Key, Mail, Smartphone, CreditCard, BrainCircuit, Cloud, UserX, FileWarning, Laptop, Skull } from 'lucide-react';
import { AreaChart, Card, Title, Text } from '@tremor/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar, LineChart, Line, Scatter, ScatterChart, ZAxis, AreaChart as RechartsArea, Area, ComposedChart, Treemap } from 'recharts';

// Enhanced attack types with sub-categories
const attackTypes = [
  { id: 'all', name: 'All Attacks', icon: Shield },
  { id: 'phishing', name: 'Phishing Attacks', icon: Mail },
  { id: 'deepfake', name: 'Deepfake', icon: Camera },
  { id: 'social', name: 'Social Engineering', icon: Fingerprint },
  { id: 'malware', name: 'Malware', icon: Virus },
  { id: 'ddos', name: 'DDoS', icon: WifiIcon },
  { id: 'ransomware', name: 'Ransomware', icon: Lock },
  { id: 'zeroday', name: 'Zero-Day', icon: Zap },
  { id: 'cryptojacking', name: 'Cryptojacking', icon: Key },
  { id: 'ai', name: 'AI-Based Attacks', icon: BrainCircuit },
];

// Enhanced data for each attack type
const malwareData = [
  { date: '2024-01', ransomware: 450, spyware: 300, trojan: 200, worm: 150, rootkit: 180, adware: 220 },
  { date: '2024-02', ransomware: 680, spyware: 420, trojan: 350, worm: 280, rootkit: 250, adware: 310 },
  { date: '2024-03', ransomware: 540, spyware: 380, trojan: 280, worm: 220, rootkit: 200, adware: 270 },
  { date: '2024-04', ransomware: 890, spyware: 550, trojan: 420, worm: 340, rootkit: 420, adware: 380 },
];

const ddosData = [
  { type: 'UDP Flood', value: 400, impact: 80, mitigation: 75 },
  { type: 'SYN Flood', value: 300, impact: 65, mitigation: 85 },
  { type: 'HTTP Flood', value: 200, impact: 45, mitigation: 90 },
  { type: 'DNS Amplification', value: 278, impact: 55, mitigation: 70 },
  { type: 'NTP Amplification', value: 189, impact: 40, mitigation: 95 },
  { type: 'ICMP Flood', value: 245, impact: 35, mitigation: 88 },
];

const deepfakeData = [
  { category: 'Image', detected: 320, prevented: 280, accuracy: 87, type: 'Face Swap', complexity: 75 },
  { category: 'Audio', detected: 250, prevented: 200, accuracy: 80, type: 'Voice Clone', complexity: 82 },
  { category: 'Video', detected: 420, prevented: 350, accuracy: 83, type: 'Full Body', complexity: 90 },
  { category: 'Mixed Media', detected: 180, prevented: 150, accuracy: 85, type: 'Hybrid', complexity: 95 },
];

const socialEngineeringData = [
  { subject: 'Email Phishing', A: 120, B: 110, fullMark: 150 },
  { subject: 'SMS Phishing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Voice Phishing', A: 86, B: 130, fullMark: 150 },
  { subject: 'Whaling', A: 99, B: 100, fullMark: 150 },
  { subject: 'Spear Phishing', A: 85, B: 90, fullMark: 150 },
  { subject: 'QR Phishing', A: 65, B: 85, fullMark: 150 },
  { subject: 'Social Media', A: 78, B: 88, fullMark: 150 },
  { subject: 'Business Email', A: 90, B: 100, fullMark: 150 },
];

const phishingData = {
  name: 'Phishing',
  children: [
    {
      name: 'Email Based',
      children: [
        { name: 'Corporate', size: 420 },
        { name: 'Personal', size: 380 },
        { name: 'Bulk', size: 290 },
      ],
    },
    {
      name: 'Mobile Based',
      children: [
        { name: 'SMS', size: 250 },
        { name: 'WhatsApp', size: 320 },
        { name: 'Other Apps', size: 180 },
      ],
    },
    {
      name: 'Web Based',
      children: [
        { name: 'Fake Login', size: 380 },
        { name: 'Malicious Ads', size: 290 },
        { name: 'Scam Sites', size: 340 },
      ],
    },
  ],
};

const aiAttackData = [
  { month: 'Jan', adversarial: 45, poisoning: 30, evasion: 25, extraction: 20 },
  { month: 'Feb', adversarial: 55, poisoning: 35, evasion: 30, extraction: 25 },
  { month: 'Mar', adversarial: 65, poisoning: 45, evasion: 35, extraction: 30 },
  { month: 'Apr', adversarial: 75, poisoning: 50, evasion: 40, extraction: 35 },
];

const zeroDayData = [
  { month: 'Jan', discovered: 12, patched: 8, exploited: 4, severity: 75 },
  { month: 'Feb', discovered: 15, patched: 10, exploited: 5, severity: 85 },
  { month: 'Mar', discovered: 8, patched: 6, exploited: 2, severity: 65 },
  { month: 'Apr', discovered: 20, patched: 12, exploited: 8, severity: 90 },
];

const cryptojackingData = [
  { time: '00:00', cpu: 45, memory: 60, network: 30, power: 40 },
  { time: '06:00', cpu: 85, memory: 90, network: 70, power: 75 },
  { time: '12:00', cpu: 65, memory: 75, network: 50, power: 55 },
  { time: '18:00', cpu: 95, memory: 85, network: 80, power: 85 },
];

const botnetActivityData = Array.from({ length: 50 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  z: Math.random() * 1000,
  type: ['DDoS', 'Spam', 'Mining', 'Data Theft'][Math.floor(Math.random() * 4)],
}));

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#0088FE', '#8884d8', '#82ca9d'];

const threatLevels = {
  critical: 12,
  high: 28,
  medium: 45,
  low: 89,
};

function App() {
  const [selectedAttackType, setSelectedAttackType] = useState('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const renderAttackContent = () => {
    switch (selectedAttackType) {
      case 'malware':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Virus className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">Malware Evolution Trends</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={malwareData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="ransomware" stackId="1" fill="#8884d8" stroke="#8884d8" />
                  <Area type="monotone" dataKey="spyware" stackId="1" fill="#82ca9d" stroke="#82ca9d" />
                  <Area type="monotone" dataKey="trojan" stackId="1" fill="#ffc658" stroke="#ffc658" />
                  <Line type="monotone" dataKey="rootkit" stroke="#ff7300" />
                  <Bar dataKey="adware" fill="#413ea0" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Malware Categories</h3>
                <div className="space-y-4">
                  {Object.entries({
                    Ransomware: { icon: Lock, desc: "Encrypts files for ransom" },
                    Spyware: { icon: Radar, desc: "Monitors user activity" },
                    Trojan: { icon: Skull, desc: "Disguised as legitimate software" },
                    Rootkit: { icon: Bug, desc: "Hides malicious activities" },
                    Adware: { icon: Globe, desc: "Displays unwanted advertisements" }
                  }).map(([name, { icon: Icon, desc }]) => (
                    <div key={name} className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <Icon className="w-5 h-5 text-cyan-400" />
                      <div>
                        <h4 className="font-medium">{name}</h4>
                        <p className="text-sm text-gray-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Infection Vectors</h3>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Email', value: 35 },
                        { name: 'Web', value: 25 },
                        { name: 'USB', value: 15 },
                        { name: 'Network', value: 20 },
                        { name: 'Other', value: 5 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={90}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={12}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'phishing':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold">Phishing Attack Distribution</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <Treemap
                  data={phishingData.children}
                  dataKey="size"
                  stroke="#fff"
                  fill="#8884d8"
                >
                  <Tooltip />
                </Treemap>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Email Phishing",
                  icon: Mail,
                  stats: { attempts: "2,450", blocked: "2,100", success: "350" }
                },
                {
                  title: "Mobile Phishing",
                  icon: Smartphone,
                  stats: { attempts: "1,280", blocked: "1,050", success: "230" }
                },
                {
                  title: "Social Media",
                  icon: UserX,
                  stats: { attempts: "890", blocked: "780", success: "110" }
                }
              ].map(({ title, icon: Icon, stats }) => (
                <div key={title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Attempts</span>
                      <span className="text-xl font-semibold">{stats.attempts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Blocked</span>
                      <span className="text-xl font-semibold text-green-400">{stats.blocked}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Successful</span>
                      <span className="text-xl font-semibold text-red-400">{stats.success}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <BrainCircuit className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-semibold">AI-Based Attack Trends</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={aiAttackData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="adversarial" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="poisoning" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="evasion" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="extraction" stackId="1" stroke="#ff7300" fill="#ff7300" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">AI Attack Types</h3>
                <div className="space-y-4">
                  {[
                    { name: "Model Poisoning", desc: "Corrupting training data" },
                    { name: "Adversarial Examples", desc: "Manipulated inputs to fool AI" },
                    { name: "Model Extraction", desc: "Stealing AI model parameters" },
                    { name: "Evasion Attacks", desc: "Bypassing AI defenses" }
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-3 bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Target Systems</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius={150}
                    data={[
                      { subject: 'Computer Vision', A: 120, fullMark: 150 },
                      { subject: 'NLP Systems', A: 98, fullMark: 150 },
                      { subject: 'Recommendation', A: 86, fullMark: 150 },
                      { subject: 'Authentication', A: 99, fullMark: 150 },
                      { subject: 'Autonomous Systems', A: 85, fullMark: 150 },
                    ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <RechartsRadar name="Attack Surface" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'ddos':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <WifiIcon className="w-6 h-6 text-red-400" />
                <h2 className="text-xl font-semibold">DDoS Attack Analysis</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={ddosData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis yAxisId="left" orientation="left" stroke="#82ca9d" />
                  <YAxis yAxisId="right" orientation="right" stroke="#ff7300" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="value" fill="#82ca9d" name="Attack Volume" />
                  <Line yAxisId="right" type="monotone" dataKey="impact" stroke="#ff7300" name="Impact Score" />
                  <Line yAxisId="right" type="monotone" dataKey="mitigation" stroke="#8884d8" name="Mitigation Rate" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Network Layer", icon: Network, count: "1,234" },
                { title: "Application Layer", icon: Globe, count: "867" },
                { title: "Protocol Attacks", icon: Server, count: "543" }
              ].map(({ title, icon: Icon, count }) => (
                <div key={title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <div className="text-3xl font-bold">{count}</div>
                  <div className="text-sm text-gray-400">Attacks Detected</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'deepfake':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="w-6 h-6 text-pink-400" />
                <h2 className="text-xl font-semibold">Deepfake Detection Analytics</h2>
              </div>
              <div className="space-y-6">
                {deepfakeData.map((item, index) => (
                  <div key={item.category} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="flex items-center gap-2">
                        {index === 0 && <Camera className="w-4 h-4" />}
                        {index === 1 && <Microphone className="w-4 h-4" />}
                        {index === 2 && <Video className="w-4 h-4" />}
                        {index === 3 && <FileWarning className="w-4 h-4" />}
                        <div>
                          <span className="font-medium">{item.category}</span>
                          <span className="text-sm text-gray-400 ml-2">({item.type})</span>
                        </div>
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-400">
                          Detection Rate: {Math.round((item.prevented / item.detected) * 100)}%
                        </span>
                        <span className="text-sm text-emerald-400">
                          Accuracy: {item.accuracy}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                        style={{ width: `${item.accuracy}%` }}
                      ></div>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-400">
                        Complexity Score: {item.complexity}
                      </span>
                      <div className="w-full bg-gray-700 h-1 rounded-full mt-1">
                        <div
                          className="h-full bg-cyan-400 rounded-full"
                          style={{ width: `${item.complexity}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Detection Methods</h3>
                <div className="space-y-4">
                  {[
                    { name: "Visual Artifacts", desc: "Detecting inconsistencies in images" },
                    { name: "Audio Analysis", desc: "Identifying synthetic voice patterns" },
                    { name: "Behavioral Analysis", desc: "Analyzing movement patterns" },
                    { name: "Metadata Verification", desc: "Checking file signatures" }
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-3 bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius={150}
                    data={[
                      { subject: 'Social Media', A: 120, fullMark: 150 },
                      { subject: 'Financial', A: 98, fullMark: 150 },
                      { subject: 'Political', A: 86, fullMark: 150 },
                      { subject: 'Personal', A: 99, fullMark: 150 },
                      { subject: 'Corporate', A: 85, fullMark: 150 },
                    ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <RechartsRadar name="Impact Level" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Fingerprint className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-semibold">Social Engineering Attack Patterns</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={socialEngineeringData}>
                  <PolarGrid stroke="#666" />
                  <PolarAngleAxis dataKey="subject" stroke="#888" />
                  <PolarRadiusAxis stroke="#888" />
                  <RechartsRadar
                    name="Current Month"
                    dataKey="A"
                    stroke="#88d8b1"
                    fill="#88d8b1"
                    fillOpacity={0.6}
                  />
                  <RechartsRadar
                    name="Previous Month"
                    dataKey="B"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Business Email Compromise",
                  icon: Mail,
                  stats: { attempts: "450", prevented: "425", loss: "$2.1M" }
                },
                {
                  title: "Vishing Attacks",
                  icon: Smartphone,
                  stats: { attempts: "280", prevented: "265", loss: "$850K" }
                },
                {
                  title: "Impersonation",
                  icon: UserX,
                  stats: { attempts: "180", prevented: "165", loss: "$620K" }
                }
              ].map(({ title, icon: Icon, stats }) => (
                <div key={title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Attempts</span>
                      <span className="text-xl font-semibold">{stats.attempts}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Prevented</span>
                      <span className="text-xl font-semibold text-green-400">{stats.prevented}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Potential Loss</span>
                      <span className="text-xl font-semibold text-red-400">{stats.loss}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'botnet':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Network className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold">Botnet Activity Heatmap</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis type="number" dataKey="x" name="Longitude" stroke="#888" />
                  <YAxis type="number" dataKey="y" name="Latitude" stroke="#888" />
                  <ZAxis type="number" dataKey="z" range={[0, 500]} name="Size" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter />
                  name="Botnet Activity"
                  data={botnetActivityData}
                  fill="#8884d8"
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Botnet Types</h3>
                <div className="space-y-4">
                  {[
                    { name: "DDoS Botnets", desc: "Coordinated network attacks" },
                    { name: "Spam Botnets", desc: "Mass email distribution" },
                    { name: "Mining Botnets", desc: "Cryptocurrency mining" },
                    { name: "Data Theft", desc: "Information stealing" }
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-3 bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'DDoS', value: 40 },
                        { name: 'Spam', value: 30 },
                        { name: 'Mining', value: 20 },
                        { name: 'Data Theft', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      case 'zeroday':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold">Zero-Day Vulnerability Analysis</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={zeroDayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis yAxisId="left" stroke="#888" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="discovered" fill="#8884d8" name="Discovered" />
                  <Bar yAxisId="left" dataKey="patched" fill="#82ca9d" name="Patched" />
                  <Bar yAxisId="left" dataKey="exploited" fill="#ff7300" name="Exploited" />
                  <Line yAxisId="right" type="monotone" dataKey="severity" stroke="#ffc658" name="Severity Score" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Operating Systems",
                  icon: Laptop,
                  stats: { total: 8, critical: 3 }
                },
                {
                  title: "Web Applications",
                  icon: Globe,
                  stats: { total: 12, critical: 5 }
                },
                {
                  title: "Network Protocols",
                  icon: Server,
                  stats: { total: 6, critical: 2 }
                }
              ].map(({ title, icon: Icon, stats }) => (
                <div key={title} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Total Vulnerabilities</span>
                      <span className="text-xl font-semibold">{stats.total}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Critical</span>
                      <span className="text-xl font-semibold text-red-400">{stats.critical}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cryptojacking':
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold">Cryptojacking Resource Impact</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={cryptojackingData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#666" />
                  <XAxis dataKey="time" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="network" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Line type="monotone" dataKey="power" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Detection Methods</h3>
                <div className="space-y-4">
                  {[
                    { name: "CPU Monitoring", desc: "Tracking unusual CPU usage patterns" },
                    { name: "Network Analysis", desc: "Detecting mining pool connections" },
                    { name: "Process Inspection", desc: "Identifying suspicious processes" },
                    { name: "Power Usage", desc: "Monitoring energy consumption spikes" }
                  ].map(({ name, desc }) => (
                    <div key={name} className="p-3 bg-gray-700/30 rounded-lg">
                      <h4 className="font-medium">{name}</h4>
                      <p className="text-sm text-gray-400">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold mb-4">Impact Analysis</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius={150}
                    data={[
                      { subject: 'CPU Usage', A: 120, fullMark: 150 },
                      { subject: 'Memory', A: 98, fullMark: 150 },
                      { subject: 'Network', A: 86, fullMark: 150 },
                      { subject: 'Power', A: 99, fullMark: 150 },
                      { subject: 'Temperature', A: 85, fullMark: 150 },
                    ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <RechartsRadar name="Resource Impact" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 col-span-full lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-semibold">Overall Threat Landscape</h2>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={[
                  { month: 'Jan', malware: 450, phishing: 300, ddos: 200, ai: 150 },
                  { month: 'Feb', malware: 680, phishing: 420, ddos: 350, ai: 280 },
                  { month: 'Mar', malware: 540, phishing: 380, ddos: 280, ai: 220 },
                  { month: 'Apr', malware: 890, phishing: 550, ddos: 420, ai: 340 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="malware" fill="#8884d8" stroke="#8884d8" />
                  <Bar dataKey="phishing" fill="#82ca9d" />
                  <Line type="monotone" dataKey="ddos" stroke="#ffc658" />
                  <Line type="monotone" dataKey="ai" stroke="#ff7300" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold">Critical Alerts</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { type: "Ransomware", target: "Financial System", severity: "Critical" },
                    { type: "DDoS", target: "Web Services", severity: "High" },
                    { type: "Data Breach", target: "User Database", severity: "Critical" },
                    { type: "AI Attack", target: "Authentication", severity: "High" },
                  ].map((alert) => (
                    <div key={alert.type} className="p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{alert.type}</h3>
                          <p className="text-sm text-gray-400">{alert.target}</p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${alert.severity === "Critical"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                            }`}
                        >
                          {alert.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attack Sources Section */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 lg:w-6/7">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="w-6 h-6 text-purple-400" />
                  <h2 className="text-xl font-semibold">Attack Sources</h2>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "External", value: 60 },
                        { name: "Internal", value: 25 },
                        { name: "Unknown", value: 15 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
        <img
        src="/impx.jpg"
        alt="Logo"
        className="w-20 h-18 rounded-full"
      />
          <Shield className="w-10 h-10 text-cyan-400" />
          <h1 className="text-3xl font-bold">CyberGuard Advanced Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span>Live Monitoring</span>
          </div>
          <div className="flex items-center gap-2 bg-red-500/20 px-3 py-1 rounded-full">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-sm">Critical Threats: {threatLevels.critical}</span>
          </div>
        </div>
      </header>

      {/* Attack Type Selector */}
      <div className="mb-8 relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full md:w-64 bg-gray-800 p-5 rounded-lg border border-gray-700 flex items-center justify-between hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            {attackTypes.find(type => type.id === selectedAttackType)?.icon &&
              React.createElement(attackTypes.find(type => type.id === selectedAttackType)!.icon, {
                className: "w-5 h-5 text-cyan-500"
              })
            }
            <span>{attackTypes.find(type => type.id === selectedAttackType)?.name}</span>
          </div>
          <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-2 w-full md:w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
            {attackTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setSelectedAttackType(type.id);
                  setDropdownOpen(false);
                }}
                className="w-full p-3 flex items-center gap-2 hover:bg-gray-700/50 transition-colors"
              >
                <type.icon className="w-5 h-5 text-cyan-400" />
                <span>{type.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Threat Level Indicators */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {Object.entries(threatLevels).map(([level, count]) => (
          <div key={level} className={`bg-gray-800/50 p-6 rounded-lg border border-gray-700 backdrop-blur-sm
            ${level === 'critical' ? 'border-red-500/50' : ''}
            ${level === 'high' ? 'border-orange-500/50' : ''}
            ${level === 'medium' ? 'border-yellow-500/50' : ''}
            ${level === 'low' ? 'border-green-500/50' : ''}`}>
            <div className="flex items-center justify-between">
              <span className="capitalize">{level}</span>
              <span className="text-2xl font-bold">{count}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mt-2">
              <div className={`h-full rounded-full
                ${level === 'critical' ? 'bg-red-500' : ''}
                ${level === 'high' ? 'bg-orange-500' : ''}
                ${level === 'medium' ? 'bg-yellow-500' : ''}
                ${level === 'low' ? 'bg-green-500' : ''}`}
                style={{ width: `${(count / 100) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      {renderAttackContent()}
    </div>
  );
}

export default App;