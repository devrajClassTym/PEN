# Enquiry form connection

Contact and admission forms submit to `/api/enquiries`. The server validates the fields and sends them to the Google Apps Script deployment with a private shared secret. It only reports success when the script returns `{ "success": true }`.

The local `.env.local` contains the supplied deployment URL. Complete the empty secret value:

```dotenv
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
GOOGLE_APPS_SCRIPT_SECRET=your-secret-from-script-properties
```

Find the secret in Apps Script under **Project Settings → Script properties → FORM_SECRET** after running `setup`. The website variable `GOOGLE_APPS_SCRIPT_SECRET` must match that value exactly. Keep these variables server-only; do not add `NEXT_PUBLIC_` or commit the secret.

Restart the development server after configuring it. Add both variables to your hosting provider and redeploy for production. Deploy the script as a web app executing as you with access for Anyone; the spreadsheet itself can stay private.

Submit one enquiry from each page and confirm they appear in **Contact Enquiries** and **Admission Enquiries**. Opening the deployment URL only checks that the script is running; it does not test a write. Keep the deployed script's field names aligned with the website: `type` is `contact` or `admission`, and the server adds `secret` to the JSON body.

If a request times out, check the sheet before resubmitting, since Google may have saved the row before the response was lost. The website does not retry writes automatically. After editing Apps Script, update its deployment to a new version using **Deploy → Manage deployments**.
