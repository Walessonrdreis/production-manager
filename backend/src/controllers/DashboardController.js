const User = require('../models/User');

class DashboardController {
  async getMetrics(req, res) {
    try {
      console.log('[Dashboard] Buscando métricas...');
      
      // Buscar dados do banco
      const totalUsers = await User.count();
      const activeUsers = await User.count({ where: { active: true } });
      
      console.log('[Dashboard] Dados de usuários:', { totalUsers, activeUsers });
      
      // TODO: Implementar quando os outros modelos estiverem prontos
      const metrics = {
        users: {
          total: totalUsers,
          active: activeUsers
        },
        orders: {
          total: 0,
          pending: 0,
          completed: 0
        },
        products: {
          total: 0,
          lowStock: 0
        },
        revenue: {
          daily: 0,
          weekly: 0,
          monthly: 0
        }
      };

      console.log('[Dashboard] Métricas preparadas:', metrics);
      return res.json(metrics);
    } catch (error) {
      console.error('[Dashboard] Erro ao buscar métricas:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar métricas',
        details: error.message 
      });
    }
  }

  async getRecentActivities(req, res) {
    try {
      console.log('[Dashboard] Buscando atividades recentes...');
      
      // TODO: Implementar quando os outros modelos estiverem prontos
      const activities = [
        {
          id: '1',
          type: 'user',
          action: 'login',
          description: 'Usuário fez login no sistema',
          date: new Date(),
          user: req.userId
        }
      ];

      console.log('[Dashboard] Atividades encontradas:', activities.length);
      return res.json(activities);
    } catch (error) {
      console.error('[Dashboard] Erro ao buscar atividades:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar atividades',
        details: error.message 
      });
    }
  }

  async getChartData(req, res) {
    try {
      console.log('[Dashboard] Buscando dados dos gráficos...');
      
      // TODO: Implementar quando os outros modelos estiverem prontos
      const chartData = {
        sales: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          data: [0, 0, 0, 0, 0, 0]
        },
        users: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          data: [0, 0, 0, 0, 0, 0]
        }
      };

      console.log('[Dashboard] Dados dos gráficos preparados');
      return res.json(chartData);
    } catch (error) {
      console.error('[Dashboard] Erro ao buscar dados dos gráficos:', error);
      return res.status(500).json({ 
        error: 'Erro ao buscar dados dos gráficos',
        details: error.message 
      });
    }
  }
}

module.exports = new DashboardController(); 