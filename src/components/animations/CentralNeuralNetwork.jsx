import React, { useRef, useEffect } from 'react';

const CentralNeuralNetwork = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const skills = [
      { name: 'C#', color: '#22d3ee', radius: 140, speed: 0.002, offset: 0 },
      { name: 'HLSL', color: '#e879f9', radius: 140, speed: 0.002, offset: Math.PI },
      { name: 'Unity', color: '#ffffff', radius: 190, speed: -0.0015, offset: 1 },
      { name: 'Shader Graph', color: '#a78bfa', radius: 190, speed: -0.0015, offset: 3 },
      { name: 'VFX', color: '#f472b6', radius: 190, speed: -0.0015, offset: 5 },
    ];

    let time = 0;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${container.clientWidth}px`;
      canvas.style.height = `${container.clientHeight}px`;
    };

    const draw = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);
      time += 1;

      skills.forEach((skill, index) => {
        const angle = time * skill.speed + skill.offset;
        const floatX = Math.cos(time * 0.01 + index) * 5;
        const floatY = Math.sin(time * 0.01 + index) * 5;

        const x = centerX + Math.cos(angle) * skill.radius + floatX;
        const y = centerY + Math.sin(angle) * skill.radius + floatY;

        const pulse = (Math.sin(time * 0.05 + index) + 1) / 2;
        const alpha = 0.15 + pulse * 0.15;

        const gradient = ctx.createLinearGradient(centerX, centerY, x, y);
        gradient.addColorStop(0, `rgba(34, 211, 238, 0)`);
        gradient.addColorStop(0.5, skill.color === '#ffffff' ? `rgba(255,255,255, ${alpha})` : skill.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));
        gradient.addColorStop(1, skill.color === '#ffffff' ? `rgba(255,255,255, ${alpha})` : skill.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba'));

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
        ctx.fill();
        ctx.strokeStyle = skill.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();

        ctx.font = '12px "JetBrains Mono", monospace';
        ctx.fillStyle = skill.color;
        ctx.textAlign = 'center';
        ctx.fillText(skill.name, x, y + 32);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CentralNeuralNetwork;
