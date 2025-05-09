import { useState, useEffect } from 'react'

const apiUrl = import.meta.env.VITE_API_URL ?? ''

const HostInfo = () => {
  const [hostInfo, setHostInfo] = useState(null)
  const [hostFrontInfo, setHostFrontInfo] = useState(null)

  useEffect(() => {
    // Hacemos la solicitud a la API del backend (Express)
    fetch(`${apiUrl}/api/hostinfo`)
      .then((response) => response.json())
      .then((data) => setHostInfo(data))
      .catch((error) => console.error('Error fetching host info:', error))

    // Seteamos hostFrontInfo
    setHostFrontInfo({
      podName: window.__ENV__?.VITE_HOSTNAME ?? 'N/A',
      ip: window.__ENV__?.VITE_IP ?? 'N/A',
    })
  }, [])

  if (!hostInfo) {
    return <div>Loading...</div>
  }

  return (
    <div className='md:w-[50rem] grid md:grid-cols-2 gap-4'>
      <div className=''>
        <h3 className='text-2xl font-bold mb-6'>Backend Info</h3>
        <p>
          <strong>Docker:</strong> {hostInfo.Docker ? 'true' : 'false'}
        </p>
        <p>
          <strong>Kubernetes:</strong> {hostInfo.Kubernetes ? 'true' : 'false'}
        </p>
        <p>
          <strong>Pod Name:</strong> {hostInfo.PodName}
        </p>
        <p>
          <strong>Hostname:</strong> {hostInfo.hostname}
        </p>
        <p>
          <strong>IP:</strong> {hostInfo.IP}
        </p>
      </div>

      <div className=''>
        <h3 className='text-2xl font-bold mb-6'>Frontend Info</h3>
        <p>
          <strong>Docker:</strong> {hostFrontInfo.podName ? 'false' : 'true'}
        </p>
        <p>
          <strong>Kubernetes:</strong>{' '}
          {hostFrontInfo.podName ? 'true' : 'false'}
        </p>
        <p>
          <strong>Pod Name:</strong> {hostFrontInfo.podName}
        </p>
        <p>
          <strong>Hostname:</strong> {hostFrontInfo.podName}
        </p>
        <p>
          <strong>IP:</strong> {hostFrontInfo.ip}
        </p>
      </div>
    </div>
  )
}

export default HostInfo
