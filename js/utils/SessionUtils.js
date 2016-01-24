/**
 * @flow
 */

const NUM_SESSIONS = 9;

function sessionFromMonth(month: number): number {
  if (month >= 0 && month < 6) {
    return 1;
  } else if (month >= 6 && month < 9) {
    return 2;
  }
  return 3;
}

export function getCurrentSession(date: Date): string {
  const year = date.getFullYear();
  const session = sessionFromMonth(date.getMonth());
  return `${year}${session}`;
}

export function getCurrentSessions(date: Date): [string] {
  let year = date.getFullYear();
  let session = sessionFromMonth(date.getMonth());
  const sessions = [];
  session++;
  if (session === 4) {
    session = 1;
    year++;
  }
  for (let i = 0; i < NUM_SESSIONS; i++) {
    sessions.push(`${year}${session}`);
    session--;
    if (session === 0) {
      session = 3;
      year--;
    }
  }
  return sessions;
}

/**
 * Returns the name of a session from it's value.
 * @param  {string} yearSession The session value
 * @return {string} The session name
 */
export function getSessionName(yearSession: ?string): string {
  if (!yearSession) {
    return '';
  }
  const year = yearSession.substring(0, 4);
  const session = yearSession.substring(4, 5);
  let sessionName;
  switch (session) {
    case '1':
      sessionName = 'Winter';
      break;
    case '2':
      sessionName = 'Summer';
      break;
    case '3':
    default:
      sessionName = 'Fall';
      break;
  }
  return `${sessionName} ${year}`;
}
