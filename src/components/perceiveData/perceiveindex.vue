 <template>
  <div class="perceiveindex">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem name="1" class="wsn" to="/">
            物联网感知平台
          </MenuItem>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-book" @click="back"></Icon>
                应用管理
              </template>
              <MenuItem name="1-1" to="/application1">应用1</MenuItem>
              <MenuItem name="1-2" to="/application2">应用2</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="md-git-network"></Icon>
                拓扑图
              </template>
              <router-link to="/sensetopology">
                <MenuItem name="1-1">系统拓扑图</MenuItem>
              </router-link>
            </Submenu>
          </Menu>
        </Sider>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
  </div>
</template>

<script>
    export default {
        name: "perceiveindex",
        methods:{
          back(){
            this.$router.push('/testindex')
          }
        }
    }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    border-radius: 3px;

    position: relative;
    top: 15px;
    left: 150px;
    background-image: url('../../assets/WSN.png');
    background-size: 100% 100%;
  }

  .wsn {
    font-size: large;
  }

</style>
