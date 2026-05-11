export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 text-center font-sans text-foreground">
      <div className="max-w-xl space-y-3">
        <p className="text-sm font-medium text-primary">CodePilot</p>
        <h1 className="text-3xl font-semibold tracking-normal">
          AI-powered developer analytics for engineering leaders.
        </h1>
        <p className="text-sm text-muted-foreground">
          Open the dashboard to monitor velocity, delivery risk, and team health.
        </p>
      </div>
    </div>
  );
}
