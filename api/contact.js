import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. 폼에서 전송될 interest(관심 광고) 항목을 추가로 받습니다.
  const { name, phone, interest } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mainandtop@gmail.com',
      pass: 'kndlhulcjvwxnfse' 
    }
  });

  try {
    await transporter.sendMail({
      from: '밀양 라포르테 알람',
      to: 'mainandtop@gmail.com',
      subject: `[ph1603] ${name}님 (${phone})`,
      // 2. 이메일 본문에 관심 광고 항목을 추가합니다.
      text: `이름: ${name}\n연락처: ${phone}\n관심항목: ${interest || '선택 안함'}`
    });
    
    return res.send(`<script>alert("접수되었습니다."); window.location.href="/";</script>`);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
