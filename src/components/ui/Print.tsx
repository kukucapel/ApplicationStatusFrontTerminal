'use client';

import { useRef, useEffect } from 'react';
import QRCode from 'qrcode';

export default function Print() {
    const url =
        'https://app.kaluga-gov.ru/status/share?token=8591e58390a4859aa75e2481527b51c265eca1648c23d84b19392263c04617c3';

    const canvasRef = useRef<HTMLCanvasElement>(null);

    async function handlePrint() {
        if (!canvasRef.current) return;

        // Генерируем QR в скрытом canvas
        await QRCode.toCanvas(canvasRef.current, url, { width: 300 });

        // // Печатаем
        window.print();
    }
    return (
        <div>
            <button onClick={handlePrint}>Распечатать QR</button>

            {/* скрытая зона для печати */}
            <div>
                <canvas ref={canvasRef}></canvas>
            </div>
        </div>
    );
}
