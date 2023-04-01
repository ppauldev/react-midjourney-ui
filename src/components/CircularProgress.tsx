import { useEffect, useState } from "react"

export const CircularProgressShiftedPlane = ({ percentage }: { percentage: number | null }) => {
  return (
    <div className="perspective">
      {percentage !== null && (
        <CircularProgress
          size={80}
          strokeWidth={8}
          percentage={percentage}
          color="green"
        />
      )}
    </div>
  )
}

const CircularProgress = ({ size, strokeWidth, percentage, color }: any) => {
  const [progress, setProgress] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    setProgress(percentage)

    if (percentage === 100) setTimeout(() => setShowComplete(true), 1000)
  }, [percentage])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const dash = (progress * circumference) / 100

  return (
    <>
      {!showComplete && (
        <div className="fade-in">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke="white"
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke={color}
              strokeWidth={`${strokeWidth}px`}
              // @ts-expect-error: Mismatching typing, works
              strokeDasharray={[dash, circumference - dash]}
              strokeLinecap="round"
              style={{ transition: "all 0.5s" }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <text
              dy="8px"
              fill="#314152"
              fontSize="20px"
              fontWeight="600"
              textAnchor="middle"
              x="50%"
              y="50%"
            >
              {`${percentage}%`}
            </text>
          </svg>
        </div>
      )}
      {showComplete && (
        <div className="fade-in">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke="white"
              strokeWidth={`${strokeWidth}px`}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke={color}
              // @ts-expect-error: Mismatching typing, works
              strokeDasharray={[circumference, 0]}
              strokeLinecap="round"
              strokeWidth={`${strokeWidth}px`}
              style={{ transition: "all 0.5s" }}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
            <path
              d="M30 50 L43 63 L70 35"
              fill="none"
              stroke="green"
              strokeWidth={strokeWidth}
              transform="translate(-10,-10)"
            />
          </svg>
        </div>
      )}
    </>
  );
};